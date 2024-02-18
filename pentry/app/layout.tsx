import type {Metadata} from 'next'
import './globals.css'
import React from 'react'
import {inter, lusitana} from '@/app/ui/fonts';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';

import {croissant} from '@/app/ui/fonts';

import ReactDOM from "react-dom";
import {Inter} from "next/font/google";
import {ThemeProvider} from '@mui/material/styles';
import theme from "../theme";

/*const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})*/

export const metadata: Metadata = {
    title: 'Pantry Partner',
    description: 'Manage groceries and minimize food waste',
}
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.className} antialiased `}>

        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <div>{children}</div>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
