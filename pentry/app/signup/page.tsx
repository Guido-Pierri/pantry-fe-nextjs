import SignUpForm from "@/app/ui/signup-form";
import {Box} from "@mui/material";
import {croissant} from "@/app/ui/fonts";
import React from "react";
import theme from "@/theme";
import Navbar from "@/app/ui/navbar/navbar";
import {auth} from "@/auth";


export default async function SignupPage() {
    const session = await auth()
    return (
        <>
            <Box sx={{
                '@media (min-width:600px)': {
                    width: '600px'
                },
            }}>
                <Box sx={{
                    padding: '1rem 1rem 0 1rem',
                    '@media (min-width:600px)': {
                        width: '100%'
                    },
                }}><Navbar session={session}></Navbar>
                </Box>
            </Box>
            <SignUpForm></SignUpForm>
        </>
    )
}
