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
import {ItemCard, PantryListItemCard, ResultCard} from "@/app/ui/dashboard/cards";
import RenderPantryButtons from "@/app/ui/pantry/render-pantry-buttons";
import image from "@/app/images/404-error.png";
import Button from "@mui/material/Button";

export default function RenderPantry({pantry, user}: { pantry: PantryDto, user: User }) {
    return (
        <Box>
            {pantry && pantry.items.length > 0 ?
                <Grid container spacing={2} alignItems="stretch" justifyContent={'flex-start'}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'} sx={{mt: 0, mb: 2}}>
                            Your pantry
                        </Typography>
                    </Grid>
                    {pantry.items.map((item: Item) =>
                        <Grid item xs={6} sm={4} md={2} key={item.id}>
                            <PantryListItemCard item={item} user={user}></PantryListItemCard>
                        </Grid>
                    )}
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
                </Box>}
            <Box display={'flex'} justifyContent={'space-evenly'} mt={'1rem'}>
                <Link href={'/dashboard/pantry/add-item'}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        variant={'extended'}
                        size={'small'}
                    >
                        <AddIcon/>Add items
                    </Fab></Link>
                <Link href={'/dashboard/search'}>
                    <Fab size={"small"} color={'primary'} variant="extended"
                         sx={{marginLeft: '1rem'}}>
                        <SearchIcon/>
                        Search for an item
                    </Fab></Link>
            </Box>
        </Box>
    )
}
