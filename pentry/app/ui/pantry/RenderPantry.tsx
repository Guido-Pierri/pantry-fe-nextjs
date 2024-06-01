'use client'
import {Box, Grid, List, Typography} from "@mui/material";
import {Item, PantryDto, User} from "@/app/lib/definitions";
import Link from "@mui/material/Link";
import Image from "next/image";
import pantryPic from "@/app/images/shelving.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {PantryListItemCard} from "@/app/ui/dashboard/cards";

export default function RenderPantry({pantry, user}: { pantry: PantryDto, user: User }) {


    return (
        <Box>
            {pantry && pantry.items.length > 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography sx={{mb: 2}} variant="h5" component="div">
                            Your pantry
                        </Typography>
                        {pantry.items.map((item: Item) =>
                            <List key={item.id} dense={true}>
                                <PantryListItemCard item={item} user={user}/>

                            </List>
                        )}<Box display={'flex'} justifyContent={'space-evenly'} mt={'1rem'}>

                        <Link href={'/dashboard/pantry/add-item'}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                variant={'extended'}
                                size={'small'}
                            >
                                <AddIcon/>Add Items
                            </Fab></Link>
                        <Link href={'/dashboard/search'}>
                            <Fab size={"small"} color={'primary'} variant="extended"
                                 sx={{marginLeft: '1rem'}}>
                                <SearchIcon/>
                                Search for a product
                            </Fab></Link>
                    </Box>
                    </Grid>
                </Grid>

                : <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <Typography variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                        Your pantry is empty
                    </Typography>
                    <Image
                        src={pantryPic}
                        alt="Empty pantry"
                        priority
                    />
                    <Box display={"flex"} justifyContent={'space-evenly'}>
                        <Link href="/dashboard/pantry/add-item">
                            <Fab size={"small"} color="primary" aria-label="add" variant="extended">
                                <AddIcon/> Add Items
                            </Fab>
                        </Link>
                        <Link href={'/dashboard/search'}>
                            <Fab size={"small"} color={'primary'} variant="extended"
                                 sx={{marginLeft: '1rem',}}>
                                <SearchIcon/>
                                Search for a product
                            </Fab></Link>
                    </Box>
                </Box>}

        </Box>
    )
}