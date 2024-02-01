/*
import NextAuth, {NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
//import {authConfig} from './auth.config';
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const apiUrl = process.env.SQL_DATABASE || 'http://localhost:8000';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/email/${email}`);
        return await user.json();
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const config = {

    providers: [Google({}), GitHub,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);
                console.log('parsedCredentials', parsedCredentials)
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;

                    const user = await getUser(email);
                    console.log('user in authorize', user)
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log('passwordsMatch', passwordsMatch)
                    //console.log('user in log in',user)
                    console.log('user in log in', user)
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ], callbacks: {
        authorized({request, auth}) {
            const {pathname} = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
    },
} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)*/
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import type {NextAuthConfig} from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
import authConfig from "@/auth.config";

const apiUrl = process.env.SQL_DATABASE;

async function getUser(email: string, token?: string, provider?: string): Promise<User | undefined> {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (user.status === 401) {
            console.log('status 401')
            const user = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
            //Error('Failed to fetch user. status 401');
        }
        return await user.json();
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const config = {
    ...authConfig,
    providers: [
        GitHub,
        Google,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);
                console.log('parsedCredentials', parsedCredentials)
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;

                    const user = await getUser(email, undefined, 'credentials');
                    console.log('user in authorize', user)
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log('passwordsMatch', passwordsMatch)
                    //console.log('user in log in',user)
                    console.log('user in log in', user)
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        async signIn({user, account}) {
            console.log('account in signIn', account)
            console.log('user in signIn', user)
            if (account?.provider === 'google') {
                if (user && user.email) {
                    const dbUser = await getUser(user.email);
                    user = dbUser as User;
                    if (!dbUser) {
                        console.log('expired auth token')
                        return Promise.resolve(false);
                    }
                    return Promise.resolve(true);
                }
            }
            if (account?.provider === 'credentials') {

            }
            return true;
        },
        async session({token, session, user}) {
            // Add property to session, like an access_token from a provider.
            console.log('session in session start', session)
            console.log('user in session start', user)
            if (token?.token) {
                session.token = token.token as string;
            }
            session.token = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.user = token.user as User;
            console.log('session in session', session)
            if (session.user) {
                const dbUser = await getUser(session.user.email, session.token);
                if (!dbUser) {
                    console.log('expired auth token')
                    //session.expires = '0';
                    return Promise.resolve(session);
                }
                session.dbUser = dbUser;
            }
            return Promise.resolve(session)
        },
        async jwt({token, user, account}) {

            console.log('token in jwt', token)
            console.log('user in jwt', user)
            const dbUser = await getUser(token?.email as string);
            if (account?.provider === 'google') {
                if (user) {
                    token.user = user as User;
                    //workaround for setting the token in the session from the database user info
                    token.accessToken = dbUser?.token as string;
                    token.provider = account?.provider;
                    console.log('account in jwt', account)


                }
            }
            //FIXME:
            if (account?.provider === 'credentials') {
                if (user) {
                    token.user = dbUser as User;
                    token.accessToken = dbUser?.token;
                }


            }

            return token;
        },
    },

} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)
