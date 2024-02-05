import type {NextAuthConfig} from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import {DatabaseError, User} from '@/app/lib/definitions';
import authConfig from "@/auth.config";
import {newGoogleUser} from "@/app/lib/actions";

const apiUrl = process.env.SQL_DATABASE;

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (user.status === 404) {
            console.log('user not found')
            //redirect('/signup')
            //return undefined;
            throw new DatabaseError('Failed to fetch user', 404);
        }
        return await user.json();
    } catch (error) {
        if (error instanceof DatabaseError) {
            //console.error('Failed to fetch user:', error);
            throw new DatabaseError('Failed to fetch user', 404);
        }
    }
}

async function checkUser(email: string) {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/check-email/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        const data = await user.json();
        console.log('user in checkUser', data.exists);
        return data.exists;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function getGoogleUser(email: string) {
    try {
        const res = await fetch(`${apiUrl}/api/v1/users/fetch-logged-in-user/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log('res in getGoogleUser', data)
        return data;
    } catch (e) {
        console.error('Failed to fetch Google user:', e);
        throw new Error('Failed to fetch Google user.');
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

                    const user = await getUser(email);
                    console.log('user in authorize', user)
                    if (!user) return null;
                    console.log('user.password', user.password)
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
            //TODO:check if needed
            //const isOnSignUp = nextUrl.pathname.startsWith('/signup');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn /*&& !isOnSignUp*/) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },

        async signIn({user, account, profile, email, credentials}) {
            console.log('account in signIn', account)
            if (account?.provider === 'google') {
                if (profile?.email) {
                    const dbUser = await checkUser(profile?.email);
                    console.log('dbUser in signIn', dbUser)
                    //console.log('await checkUser(profile?.email)', await checkUser(profile?.email))
                    if (dbUser === false) {
                        if (profile?.email && profile?.given_name && profile?.family_name) {
                            const formData = new FormData();
                            formData.append('email', profile?.email);
                            formData.append('firstName', profile?.given_name);
                            formData.append('lastName', profile?.family_name);
                            formData.append('username', profile?.email);
                            await newGoogleUser(formData);
                        }
                    }
                }
            }
            return true;
        },
        async session({token, session, user}) {
            if (token?.token && session?.user) {
                session.token = token.token as string;
            }
            session.token = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            session.user = token.user as User;
            session.dbUser = token.user as User;

            //console.log('session in session', session)
            //console.log('session in session end', session)
            return Promise.resolve(session)
        },
        async jwt({token, user, account}) {

            /*console.log('token in jwt', token)
            console.log('user in jwt', user)
            console.log('account in jwt', account)*/
            if (account?.provider === 'google') {
                const dbUser = await getGoogleUser(token?.email as string);
                console.log('await getGoogleUser(token?.email as string)', await getGoogleUser(token?.email as string))
                console.log('dbUser in jwt', dbUser)
                token.accessToken = dbUser?.token as string;
                token.user = dbUser as User;

            }
            /*
                if (user) {
                    const dbUser = await getUser(token?.email as string);

                    token.user = user as User;
                    //workaround for setting the token in the session from the database user info
                    token.accessToken = dbUser?.token as string;
                    token.provider = account?.provider;
                    console.log('account in jwt', account)


                }
            }*/
            //FIXME:
            if (account?.provider === 'credentials') {
                const dbUser = await getUser(token?.email as string);
                if (user) {
                    token.user = user as User;
                    token.accessToken = dbUser?.token;
                }


            }
            //console.log('token in end of jwt', token)
            return token;
        },
    },

} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)
