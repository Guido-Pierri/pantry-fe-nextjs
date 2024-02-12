import type {Metadata} from 'next'
import './globals.css'
import React from "react";
import {inter, lusitana} from '@/app/ui/fonts';
import {croissant} from '@/app/ui/fonts';

import ReactDOM from "react-dom";
import {Inter} from "next/font/google";

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
        <div>{children}</div>
        </body>
        </html>
    )
}
