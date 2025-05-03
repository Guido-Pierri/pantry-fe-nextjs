import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/app/ui/navbar/navbar";
import {auth} from "@/auth";

export default async function Layout({children}: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) return null

    return (
        <Box sx={{
            width: '100%', // default to full width

        }}>
            <Box width={'100%'}>
                <Navbar session={ session}/>
            </Box>
            <Box
                padding={'1rem'}
                mt={'64px'} // Add a top margin equal to the height of the AppBar
            >{children}</Box>
        </Box>
    );
}
