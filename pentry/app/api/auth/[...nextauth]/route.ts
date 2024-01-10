import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

import {User} from "@/app/lib/definitions";
import {fetchUserByEmail} from "@/app/lib/data";

const apiUrl = process.env.SQL_DATABASE || 'http://localhost:8000';

async function getUser(email: string) {
    try {
        const user = await fetch(`${apiUrl}/api/v1/users/email/${email}`);
        console.log('user in getUser', user)
        return await user.json();
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const authOptions: AuthOptions = {
    /*pages: {
        signIn: "/auth/signin",
    },*/
    session: {
        strategy: "jwt",
    },
    /*jwt: {
        secret: process.env.NEXTAUTH_SECRET as string,
    },*/
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            idToken: true,

            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "Your User Name",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                /*const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);
                console.log('parsedCredentials', parsedCredentials)
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;*/
                if (credentials?.username == undefined) {
                    throw new Error('Please provide an email address')
                }
                const user = await getUser(credentials?.username);
                if (!user) throw new Error('User or password is not correct');
                const passwordsMatch = await bcrypt.compare(credentials?.password, user?.password);
                console.log('passwordsMatch', passwordsMatch)
                //console.log('user in log in',user)
                console.log('user in log in', user)
                const {password, ...userWithoutPassword} = user;
                console.log('userWithoutPassword', userWithoutPassword)
                if (passwordsMatch) return userWithoutPassword as User;
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) token.user = user as User;
            console.log('token in jwt', token)
            console.log('token.user', token.user)
            console.log('user in jwt', user)
            return token;
        },

        async session({token, session}) {

            session.user = token.user;
            console.log('session in session', session)
            return session;
        },
    },
    debug: true,

};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};