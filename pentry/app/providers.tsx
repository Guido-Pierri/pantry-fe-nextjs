'use client';
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    // 2. Wrap NextUIProvider at the root of your app
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
}