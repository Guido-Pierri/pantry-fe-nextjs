'use client'
import {Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Item, PantryDto, User} from "@/app/lib/definitions";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import Image from "next/image";
import pantryPic from "@/app/images/shelving.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {deleteItemById} from "@/app/lib/actions";
import theme from "@/theme";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function RenderPantry({pantry, userFromDatabase}: { pantry: PantryDto, userFromDatabase: User }) {

    async function deleteItem(id: string) {
        'use client'
        console.log('delete item')
        if (!userFromDatabase.token) return
        await deleteItemById(id, userFromDatabase.token)
    }

    const calculateExpiring = (date: string) => {
        const today = new Date()
        const expiration = new Date(date)
        const timeDiff = Math.abs(expiration.getTime() - today.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays <= 3) {
            return true
        }
    }
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
                                <ListItem

                                    sx={calculateExpiring(item.expirationDate) ? {
                                        backgroundColor: theme.palette.secondary.light,
                                        borderRadius: '1rem',
                                    } : {
                                        backgroundColor: theme.palette.primary.light,
                                        borderRadius: '1rem',
                                    }}

                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon onClick={() => deleteItem(item.id)}/>
                                        </IconButton>
                                    }
                                >
                                    <Link href={`/dashboard/pantry/items/${item.id}`} underline={'none'}>
                                        <ListItemAvatar>
                                            <Avatar style={{overflow: 'hidden', position: 'relative'}}>
                                                <Image src={item.image}
                                                       alt={item.name}
                                                       fill={true}
                                                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                       style={{objectFit: 'cover'}}/>

                                            </Avatar>
                                        </ListItemAvatar>
                                    </Link>
                                    <Link href={`/dashboard/pantry/items/${item.id}`} color={'black'}
                                          underline={'none'}>
                                        <ListItemText
                                            primary={`${item.name}`}
                                            secondary={calculateExpiring(item.expirationDate) ?
                                                (<Typography color={theme.palette.secondary.main}> This item expires
                                                    soon!
                                                </Typography>) : null}
                                            primaryTypographyProps={{variant: 'h6'}}
                                            secondaryTypographyProps={{color: 'secondary.dark'}}
                                        />
                                    </Link>
                                </ListItem>

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