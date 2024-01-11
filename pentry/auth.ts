import NextAuth, {NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
//import {authConfig} from './auth.config';
import Google from "next-auth/providers/google";

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

    providers: [Google({}),
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

export const {handlers, auth, signIn, signOut} = NextAuth(config)