import type {Metadata} from 'next'
import './globals.css'
import React from "react";
import {inter, lusitana} from '@/app/ui/fonts';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import "reflect-metadata"
import {croissant} from '@/app/ui/fonts';

import ReactDOM from "react-dom";
import {Providers} from "@/app/providers";
//const inter = Inter({ subsets: ['latin'] })

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
        <Providers>{children}<ToastContainer/>
        </Providers>
        </body>
        </html>
    )
}
