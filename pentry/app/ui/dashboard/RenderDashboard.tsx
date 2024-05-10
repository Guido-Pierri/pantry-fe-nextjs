import {JSX} from "react";
import Link from "next/link";
import {Cards} from "@/app/ui/dashboard/cards";
import {Box, Typography} from "@mui/material";

export default function RenderDashboard(): JSX.Element {
    return (
        <>
            <Typography variant={'h5'} mb={'1rem'}>Welcome to Pantry Partner!</Typography>
            <Box>
                <Link href={"/dashboard/pantry"} style={{margin: '1rem'}}><Cards title="My Pantry"
                                                                                 value={''}
                                                                                 type="items"/>
                </Link>
                <Link href={"/dashboard/recipes"} style={{margin: '1rem'}}><Cards title="Recipes" value={''}
                                                                                  type="recipes"/></Link>
                <Link href={"/dashboard/pantry/add-item"} style={{margin: '1rem'}}><Cards title="Add an item" value={''}
                                                                                          type="addItem"/></Link>
                <Link href={"/dashboard/search"} style={{margin: '1rem'}}><Cards title="Search" value={''}
                                                                                 type="search"/></Link>

            </Box>
        </>
    );
}