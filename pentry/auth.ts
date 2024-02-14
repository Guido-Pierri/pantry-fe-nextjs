import type {NextAuthConfig} from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import {DatabaseError, User} from '@/app/lib/definitions';
import authConfig from "@/auth.config";
import {createGoogleUser} from "@/app/lib/actions";
import {stringify} from "node:querystring";

const apiUrl = process.env.SQL_DATABASE;

export async function getUser(email: string, password: string): Promise<User | undefined> {
    console.log('inside getUser')
    try {
        console.log('inside try')

        const req = {password: password}
        const user = await fetch(`${apiUrl}/api/v1/users/login/${email}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
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

async function checkUser(token: string) {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: token
        });
        console.log('user', user)
        const data = await user.json();
        return data.exists;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function getGoogleUser(email: string, token: string) {
    try {
        const res = await fetch(`${apiUrl}/api/v1/users/fetch-logged-in-user/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Oauth2 ${token}`
            },
        });
        const data = await res.json();
        return data;
    } catch (e) {
        console.error('Failed to fetch Google user:', e);
        throw new Error('Failed to fetch Google user.');
    }
}

async function isTokenExpired(token: string) {
    const res = await fetch(`${apiUrl}/api/v1/users/check-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    console.log('res.status', res.status)
    if (res.status === 403) {
        return true;

    } else return false;
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
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    console.log('password', password)
                    const user = await getUser(email, password);
                    if (!user) return null;
                    return user;
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
            const isToken = !!auth?.user?.token;
            //TODO:check if needed
            //const isOnSignUp = nextUrl.pathname.startsWith('/signup');
            if (isOnDashboard) {
                if (isLoggedIn/* && isToken*/) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn /*&& !isOnSignUp*/) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },

        async signIn({user, account, profile, email, credentials}) {

            if (account?.provider === 'google') {
                if (profile?.email && account?.id_token) {
                    console.log('token', account.id_token)
                    const isDbUser = await checkUser(account?.id_token);
                    /*
                                        console.log('dbUser in signIn', dbUser)
                    */
                    //console.log('await checkUser(profile?.email)', await checkUser(profile?.email))
                    if (isDbUser === false) {
                        if (profile?.email && profile?.given_name && profile?.family_name) {
                            const formData = new FormData();
                            formData.append('email', profile?.email);
                            formData.append('firstName', profile?.given_name);
                            formData.append('lastName', profile?.family_name);
                            formData.append('username', profile?.email);
                            formData.append('imageUrl', profile?.picture);
                            await createGoogleUser(formData);
                        }
                    }
                }
            }
            return true;
        },
        async session({token, session, user}) {
            /*console.log('token in session', token)
            console.log('session in session', session)*/
            if (token?.token && session?.user) {
                session.token = token.token as string;
            }
            session.token = token.accessToken as string;
            session.user = token.user as User;
            session.dbUser = token.user as User;

            //console.log('session in session', session)
            /*
                        console.log('session in session end', session)
            */
            if (await isTokenExpired(session.token)) {
                session.token = null;
            }
            return Promise.resolve(session)
        },

        async jwt({token, user, account}) {

            /*console.log('token in jwt', token)
            console.log('user in jwt', user)*/

            if (account?.provider === 'google') {
                const dbUser = await getGoogleUser(token?.email as string, account?.id_token as string);
                /*console.log('await getGoogleUser(token?.email as string)', await getGoogleUser(token?.email as string, account?.id_token as string))
                console.log('dbUser in jwt', dbUser)*/
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
                /*console.log('token in jwt', token)
                console.log('user in jwt', user)*/


                if (user) {
                    const dbUser = user as User;
                    token.user = user as User;
                    token.accessToken = dbUser?.token;
                }
                if (await isTokenExpired(token?.accessToken as string)) {
                    /*
                                        console.log('token expired')
                    */
                    return null;
                }

            }
            //console.log('token in end of jwt', token)
            return token;
        },
    },

} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)
