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
        }}>
            <Box width={'100%'} sx={{
                padding: '1rem 1rem 0 1rem',
                '@media (min-width:600px)': {
                    width: '100%'
                },
            }}>
                <Navbar session={session}/>
            </Box>
            <Box
                padding={'1rem'} sx={{
                '@media (min-width:600px)': {
                    width: '600px',
                },
            }}>{children}</Box>
        </Box>
    );
}