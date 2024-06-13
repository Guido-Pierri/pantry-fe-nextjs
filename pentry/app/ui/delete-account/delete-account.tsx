import {User} from "@/app/lib/definitions";
import {Box} from "@mui/material";
import React from "react";

import DeleteUser from "@/app/ui/delete-account/delete-user";

export default async function DeleteAccount({user}: { user: User }) {

    return (
        <Box>
            <DeleteUser id={user.id}/>
        </Box>
    )
}

