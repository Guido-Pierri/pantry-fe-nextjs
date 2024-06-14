import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {Box} from "@mui/material";
import React from "react";

export default function RenderPantryButtons() {
    return (

        <Box display={"flex"} justifyContent={'space-evenly'}>
            <Link href="/dashboard/pantry/add-item">
                <Fab size={"small"} color="primary" aria-label="add" variant="extended">
                    <AddIcon/> Add a new item
                </Fab>
            </Link>
            <Link href={'/dashboard/search'}>
                <Fab size={"small"} color={'primary'} aria-label="search" variant="extended"
                     sx={{marginLeft: '1rem',}}>
                    <SearchIcon/>
                    Search for an item
                </Fab></Link>
        </Box>
    )
}
