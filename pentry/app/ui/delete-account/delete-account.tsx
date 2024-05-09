import {User} from "@/app/lib/definitions";
import {Box, Button, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import React from "react";
import {deleteUserFromProfile} from "@/app/lib/actions";
import DeleteIcon from "@mui/icons-material/Delete";

export default async function DeleteAccount({user}: { user: User }) {

    return (
        <Box>
            <Box display={'flex'} justifyContent={'end'} flexDirection={'column'}>
                <Typography>We are sorry to see you leave</Typography>
                <DeleteUser id={user.id}/>
            </Box>
        </Box>
    )
}

function DeleteUser({id}: { id: string }) {
    const deleteUserWithId = deleteUserFromProfile.bind(null, id);
    return (
        <form action={deleteUserWithId} style={{marginTop: '1rem'}}>
            <Button endIcon={<DeleteIcon/>}
                    color={'secondary'}
                    href={'/dashboard/profile-page/delete-account'}
                    type={'submit'}>
                Delete your account
            </Button>
        </form>
    );
}