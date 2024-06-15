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
        <Box mt={'2rem'}>
            {pantry && pantry.items.length > 0 ?
                <Grid container spacing={2} alignItems="stretch" justifyContent={'center'}>
                    {/*
                    <Box mt={'2rem'}>
                        <Grid container spacing={2} alignItems="stretch">
                            {results?.length > 0 ? results?.slice(0, displayPosts).map((result, index) => (
                                <Grid item xs={6} sm={6} md={6} key={index}>
                                    <Link href={`/dashboard/pantry/add-item/items/${result.gtin}`} key={result.gtin}
                                          sx={{height: '100%', display: 'flex', flexGrow: 1}}
                                          underline={'none'}>
                                        <ResultCard item={result}></ResultCard>
                                    </Link>
                                </Grid>
                            )) : <Box display={"flex"} flexDirection={'column'} alignItems="center" mt={10}
                            >
                                <Typography variant={'h5'}>No results found</Typography>
                                <Image src={image} alt={'not found'}/></Box>}
                        </Grid>
                        {displayPosts < results.length ? (
                            <Button variant={'contained'} fullWidth={true} onClick={loadMore} sx={{marginTop: '1rem'}}>Load
                                more</Button>) : null}
                    </Box>
                */}

                    {pantry.items.map((item: Item) =>
                        <Grid item xs={6} sm={4} md={2} key={item.id}>
                            <PantryListItemCard item={item} user={user}></PantryListItemCard>
                        </Grid>
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
                    <RenderPantryButtons/>
                </Box>}

        </Box>
    )
}
