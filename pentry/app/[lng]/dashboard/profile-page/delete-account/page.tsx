import {Box} from "@mui/material";
import React from "react";
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
            <DeleteAccount user={user}/>
        </Box>
    );
}