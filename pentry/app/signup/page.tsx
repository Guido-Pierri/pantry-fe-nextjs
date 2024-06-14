import SignUpForm from "@/app/ui/sign-up/signup-form";
import {Box} from "@mui/material";
import React from "react";
import {auth} from "@/auth";
import Navbar from "@/app/ui/navbar/navbar";

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
                    <SignUpForm></SignUpForm>
                </Box>
            </Box>
        </>
    )
}
