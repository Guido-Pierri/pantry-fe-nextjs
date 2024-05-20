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
                 }} /*className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36"*/>
                <Typography fontSize={32} color={'white'}
                            fontFamily={croissant.style.fontFamily}/*w-32 text-white md:w-36`*/>
                    Pantry Partner
                </Typography>
            </Box>
            <SignUpForm></SignUpForm>
        </>
    )
}