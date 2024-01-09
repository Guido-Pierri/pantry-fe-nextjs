import NextAuth, {AuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchUserByEmail, fetchUserByUsername} from "@/app/lib/data";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {email} from "next-auth/client/__tests__/helpers/mocks";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
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
            async authorize(credentials) {
                /*const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);
                console.log('parsedCredentials', parsedCredentials)
                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;*/
                if (credentials?.username == undefined) {
                    throw new Error('Please provide an email address')
                }
                const user = await fetchUserByUsername(credentials?.username);
                if (!user) throw new Error('User or password is not correct');
                const passwordsMatch = await bcrypt.compare(credentials?.password, user?.password);
                console.log('passwordsMatch', passwordsMatch)
                //console.log('user in log in',user)
                console.log('user in log in', user)
                const {password, ...userWithoutPassword} = user;
                if (passwordsMatch) return userWithoutPassword;

            },
        })
    ]
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}