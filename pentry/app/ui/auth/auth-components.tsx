import {signIn, signOut} from "@/auth"
import Button from "@mui/material/Button"
import React from "react";
import Box from "@mui/material/Box";


export function SignIn({
                           provider
                       }:
                           {
                               provider?: string,
                           }) {
    return (
        <Box component={"form"} m={'1.5rem'}
             action={async () => {
                 "use server"
                 await signIn(provider)
             }}
        >
            <Button variant={'contained'} type={'submit'} fullWidth={true}>Google</Button>
        </Box>
    )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <Button className="w-full p-0" {...props}>
                Sign Out
            </Button>
        </form>
    )
}
