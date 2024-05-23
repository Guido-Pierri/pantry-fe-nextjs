'use client';
import Link from "next/link";
import {Cards} from "@/app/ui/dashboard/cards";
import {Box, Typography} from "@mui/material";
import {User} from "@/app/lib/definitions";

export default function RenderDashboard({user}: { user: User }) {
    console.log('user', user)
    return (
        <Box sx={{
            width: '100%', // default to full width
            '@media (min-width:600px)': {
                width: '600px',
            },
        }}>
            <Typography variant={'h5'} mb={'1rem'}>Welcome to Pantry Partner!</Typography>
            <Box>
                <Link href={"/dashboard/pantry"} style={{margin: '1rem'}}><Cards
                    title="My Pantry"
                    value={''}
                    type="items"/>
                </Link>
                <Link href={"/dashboard/recipes"} style={{margin: '1rem'}}><Cards title="Recipes" value={''}
                                                                                  type="recipes"/></Link>
                <Link href={"/dashboard/pantry/add-item"} style={{margin: '1rem'}}><Cards title="Add an item" value={''}
                                                                                          type="addItem"/></Link>
                <Link href={"/dashboard/search"} style={{margin: '1rem'}}><Cards title="Search" value={''}
                                                                                 type="search"/></Link>
                {user.roles == 'ADMIN' ?
                    <Link href={"/dashboard/admin-page"} style={{margin: '1rem'}}>
                        <Cards title="Admin page" value={''} type="user"/></Link>
                    : <Link href={"/dashboard/profile-page"} style={{margin: '1rem'}}><Cards title="Profile"
                                                                                             value={''}
                                                                                             type="user"/></Link>}
            </Box>
        </Box>
    );
}