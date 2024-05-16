import SideNav from '@/app/ui/dashboard/sidenav';
import React from "react";
import OpenDialogProvider from "@/app/ui/search/open-dialog-provider";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <OpenDialogProvider>{children}
            
        </OpenDialogProvider>
    );
}