import Table from "@/app/ui/profile-page/table";
import React from "react";
import {auth} from "@/auth";
import Box from "@mui/material/Box";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    const user = session?.user;
    if (!session?.token || !user) {
        return null
    }
    return (
        <Box>
            {id ? <Table user={user}/> : null}
        </Box>

    );
}
