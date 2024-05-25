'use client';
import React from "react";
import {Session} from "next-auth";
import NavbarLoggedIn from "@/app/ui/navbar/navbar-logged-in";
import NavbarLoggedOut from "@/app/ui/navbar/navbar-logged-out";

// Using Inline Styling

// Exporting Default Navbar to the App.js File
export default function Navbar({session}: { session: Session | null }) {
    return (
        session ? <NavbarLoggedIn/> : <NavbarLoggedOut/>


    );
}
