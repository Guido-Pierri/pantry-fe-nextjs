import {Box} from "@mui/material";
import React from "react";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import DeleteAccount from "@/app/ui/delete-account/delete-account";
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth();
    const user = session?.user;
    if (!session?.token || !user) {
        return null
    }
    return (
        <Box>
            <Breadcrumbs breadcrumbs={[
                {label: 'Dashboard', href: '/dashboard'},
                {
                    label: 'Delete Account Page',
                    href: '/dashboard/profile-page/delete-account',
                    active: true,
                },
            ]}/>
            <DeleteAccount user={user}/>
        </Box>
    );
}