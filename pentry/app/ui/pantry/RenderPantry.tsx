'use client'
import {Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Item, Pantry, PantryDto, User} from "@/app/lib/definitions";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";
import pantryPic from "@/app/images/shelving.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {deleteItemById} from "@/app/lib/actions";

export default function RenderPantry({pantry, userFromDatabase}: { pantry: PantryDto, userFromDatabase: User }) {
    //FIXME: Add delete functionality
    async function deleteItem(id: string) {
        'use client'
        console.log('delete item')
        if (!userFromDatabase.token) return
        await deleteItemById(id, userFromDatabase.token)
    }

    return (
        <>
            {pantry && pantry.items.length > 0 ?
                /*<PantryItemCard key={item?.id} item={item}/>*/
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{mt: 4, mb: 2}} variant="h5" component="div">
                            {userFromDatabase?.firstName}&apos;Pantry
                        </Typography>
                        {pantry.items.map((item: Item) =>
                            <List key={item.id} dense={true}>
                                <ListItem
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
                                            secondary={`Expires: ${item.expirationDate}`}
                                            primaryTypographyProps={{variant: 'h6'}}
                                            secondaryTypographyProps={{color: 'secondary.dark'}}
                                        />
                                    </Link>
                                </ListItem>

                            </List>
                        )}
                    </Grid>
                </Grid>

                : <div className='flex flex-col justify-between items-center md:justify-around relative'>
                    <div className={'font-bold text-xl'}>Your pantry is empty</div>
                    <Image
                        src={pantryPic}
                        alt={"Empty pantry"}
                        priority={true} // {false} | {true}

                    />
                    <Link href={'/dashboard/pantry/add-item'} className={'absolute right-9 top-2/3'}><Fab
                        color="primary"
                        aria-label="add"
                        variant={'extended'}>
                        <AddIcon/>Add Items
                    </Fab></Link>
                </div>}

        </>)
}