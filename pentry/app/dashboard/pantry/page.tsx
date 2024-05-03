import Link from "next/link";
import {Item} from "@/app/lib/definitions";
import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Image from "next/image";
import pantryPic from '@/app/images/shelving.png';
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)

    return (
        <div>
            {pantry && pantry.items.length > 0 ?
                /*<PantryItemCard key={item?.id} item={item}/>*/
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                            {userFromDatabase?.firstName}'s Pantry
                        </Typography>
                        {pantry?.items.map((item: Item) =>
                            <List key={item.id} style={{overflow: 'hidden', position: 'relative'}}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{overflow: 'hidden', position: 'relative'}}>
                                            <Link href={`/dashboard/pantry/items/${item.id}`}>
                                                <Image src={item.image}
                                                       alt={item.name}
                                                       fill={true}
                                                       style={{objectFit: 'cover'}}/>

                                            </Link>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${item.name}`}
                                        secondary={`Expires: ${item.expirationDate}`}
                                    />
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

        </div>
    )
}



