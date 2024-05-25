import {AppBar, Toolbar} from "@mui/material";
import Logo from "@/app/ui/logo";
import React from "react";

export default function NavbarLoggedOut() {
    return (
        <AppBar position="static" sx={{borderRadius: '1rem'}}>
            <Toolbar variant="dense"
                     sx={{
                         justifyContent: 'space-around',
                         display: 'flex',
                         flexDirection: 'column',
                     }}>
                <Logo/>
            </Toolbar>
        </AppBar>
    )
}