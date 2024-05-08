import {searchPaginatedItems} from "@/app/lib/data";
import {SearchPage} from "@/app/lib/definitions";
import Link from "next/link";
import {Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import image from "@/app/images/404-error.png";

export default async function Results({

                                          page,
                                      }: {
    page: SearchPage;
}) {
    if (!page) return null;
    const items = page.content;
    console.log('page', page)
    return (
        <Grid container spacing={10} columns={2}>
            <Grid item xs={12} md={6}>
                <List dense={true}>
                    {items.length > 0 ?

                        items &&
                        items.map((item) => (

                            <Link href={`/dashboard/pantry/add-item/items/${item.gtin}`} key={item.gtin}>
                                <ListItem key={item.gtin}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {item.image ?
                                                <Image src={item?.image} alt={item.name} width={50}
                                                       height={50}/> : <BrokenImageIcon/>}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={item?.brand ? item.brand : null}
                                    />
                                </ListItem>
                            </Link>
                        )) : <Box display={"flex"} flexDirection={'column'} alignItems="center" mt={10}
                        >
                            <Typography variant={'h5'}>No results found</Typography>
                            <Image src={image} alt={'not found'}/></Box>}
                </List>

            </Grid>
        </Grid>
    )
}
