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

// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
// import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
// import Reddit from "next-auth/providers/reddit"
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"

import type {NextAuthConfig} from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
import authConfig from "@/auth.config";

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
    ...authConfig,
    providers: [
        // Apple,
        // Atlassian,
        // Auth0,
        // Authentik,
        // AzureAD,
        // AzureB2C,
        // Battlenet,
        // Box,
        // BoxyHQSAML,
        // Bungie,
        // Cognito,
        // Coinbase,
        // Discord,
        // Dropbox,
        // DuendeIDS6,
        // Eveonline,
        // Facebook,
        // Faceit,
        // FortyTwoSchool,
        // Foursquare,
        // Freshbooks,
        // Fusionauth,
        GitHub,
        // Gitlab,
        Google,
        // Hubspot,
        // Instagram,
        // Kakao,
        // Keycloak,
        // Line,
        // LinkedIn,
        // Mailchimp,
        // Mailru,
        // Medium,
        // Naver,
        // Netlify,
        // Okta,
        // Onelogin,
        // Osso,
        // Osu,
        // Passage,
        // Patreon,
        // Pinterest,
        // Pipedrive,
        // Reddit,
        // Salesforce,
        // Slack,
        // Spotify,
        // Strava,
        // Todoist,
        // Trakt,
        // Twitch,
        // Twitter,
        // UnitedEffects,
        // Vk,
        // Wikimedia,
        // Wordpress,
        // WorkOS,
        // Yandex,
        // Zitadel,
        // Zoho,
        // Zoom,
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
        async session({token, session}) {
            // Add property to session, like an access_token from a provider.
            //session.accessToken = token.accessToken
            session.user = token.user as User;

            return Promise.resolve(session)
        },
        async jwt({token, user}) {
            if (user) token.user = user as User;
            console.log('token in jwt', token)
            console.log('token.user', token.user)
            console.log('user in jwt', user)
            return token;
        },

        /*async session({token, session}) {

            session.user = token.user;
            console.log('session in session', session)
            return session;
        },*/
    },

} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)
