'use client'
import {useFormStatus} from "react-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

export default function SignupButton() {
    const {pending} = useFormStatus();
    console.log('pending', pending)
    return (
        <Button variant={'contained'} color={'primary'} fullWidth={true}
                sx={{marginTop: '1rem', minWidth: 'fit-content'}}
                type={'submit'}
                aria-disabled={pending}>
            Sign up <ArrowForwardIcon sx={{marginLeft: '1rem'}}/>
        </Button>

    );
}
