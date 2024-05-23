import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/app/ui/navbar/navbar";
import {auth} from "@/auth";

export default async function Layout({children}: { children: React.ReactNode }) {
    const session = await auth()
    console.log('session in layout', session)
    if (!session) return null

    return (
        <Box sx={{
            width: '100%', // default to full width
            '@media (min-width:600px)': {
                width: '600px',
            }, height: '100vh'
        }} /*className="flex h-screen flex-col md:flex-row md:overflow-hidden"*/>
            <Box width={'100%'} sx={{
                '@media (min-width:600px)': {
                    width: '100%'
                },
            }}
                /*className="w-full flex-none md:w-64"*/>

                <Navbar/>

            </Box>
            <Box
                padding={'1rem'} sx={{
                '@media (min-width:600px)': {
                    width: '600px'
                },
            }} /*className="flex-grow p-6 md:overflow-y-auto md:p-12"*/>{children}</Box>
        </Box>
    );
}