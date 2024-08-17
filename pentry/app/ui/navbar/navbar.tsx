"use client";
import React from "react";
import { Session } from "next-auth";
import NavbarLoggedIn from "@/app/ui/navbar/navbar-logged-in";
import NavbarLoggedOut from "@/app/ui/navbar/navbar-logged-out";

export default function Navbar({ session }: { session: Session | null }) {
  return session ? <NavbarLoggedIn session={session} /> : <NavbarLoggedOut />;
}
