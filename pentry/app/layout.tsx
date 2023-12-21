import type { Metadata } from 'next'
import {Croissant_One, Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import ReactDOM from "react-dom";
//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pantry Partner',
  description: 'Manage groceries and minimize food waste',
}
const croissant = Croissant_One({subsets: ['latin'], display: 'swap', weight: '400',})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

    <body className={croissant.className}>{children}</body>
    </html>
  )
}
