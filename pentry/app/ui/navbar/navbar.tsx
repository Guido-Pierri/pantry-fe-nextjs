'use client';
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {Session} from "next-auth";
import NavbarLoggedIn from "@/app/ui/navbar/navbar-logged-in";
import NavbarLoggedOut from "@/app/ui/navbar/navbar-logged-out";

// Using Inline Styling

// Exporting Default Navbar to the App.js File
export default function Navbar({session}: { session: Session }) {
    if (!session) {
        return (
            <Box>Log in</Box>
        )
    }
    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    return (
        session ? <NavbarLoggedIn/> : <NavbarLoggedOut/>


    );
}
