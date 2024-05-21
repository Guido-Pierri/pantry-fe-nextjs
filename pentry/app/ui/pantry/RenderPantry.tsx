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
        <>
            {pantry && pantry.items.length > 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{mb: 2}} variant="h5" component="div">
                            Your pantry
                        </Typography>
                        {pantry.items.map((item: Item) =>
                            <List key={item.id} dense={true}>
                                <ListItem

                                    sx={calculateExpiring(item.expirationDate) ? {
                                        border: `1px solid ${theme.palette.secondary.dark}`,
                                        backgroundColor: theme.palette.secondary.light,
                                        borderRadius: '5px',
                                    } : {
                                        border: `1px solid ${theme.palette.primary.dark}`,
                                        backgroundColor: theme.palette.primary.light,
                                        borderRadius: '5px',
                                    }}

                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon onClick={() => deleteItem(item.id)}/>
                                        </IconButton>
                                    }
                                >
                                    <Link href={`/dashboard/pantry/items/${item.id}`}>
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
                                    <Link href={`/dashboard/pantry/items/${item.id}`}>
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
                        )}<Box display={'flex'} flexDirection={'column'} mt={'1rem'}>

                        <Link href={'/dashboard/pantry/add-item'}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                variant={'extended'}
                                sx={{width: '100%'}}
                            >
                                <AddIcon/>Add Items
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
                    <Link href="/dashboard/pantry/add-item">
                        <Fab color="primary" aria-label="add" variant="extended">
                            <AddIcon/> Add Items
                        </Fab>
                    </Link>
                </Box>}

        </>)
}