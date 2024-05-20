import SignUpForm from "@/app/ui/signup-form";
import {Box, Typography} from "@mui/material";
import {croissant} from "@/app/ui/fonts";
import React from "react";

export default async function SignupPage() {
    return (
        <>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}
                 sx={{
                     borderRadius: "1rem",
                     padding: 3,
                     margin: '1rem',
                     backgroundColor: 'primary.main',
                 }}>
                <Typography fontSize={32} color={'white'}
                            fontFamily={croissant.style.fontFamily}>
                    Pantry Partner
                </Typography>
            </Box>
            <SignUpForm></SignUpForm>
        </>
    )
}