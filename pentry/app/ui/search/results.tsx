import {searchPaginatedItems} from "@/app/lib/data";
import {SearchPage} from "@/app/lib/definitions";
import Link from "next/link";
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";

export default async function Results({
                                          query,
                                          currentPage,
                                          token
                                      }: {
    query: string;
    currentPage: number;
    token: string;
}) {
    const page: SearchPage | null = await searchPaginatedItems(query, token, currentPage);
    if (!page) return null;
    const items = page.content;
    return (
        <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
                <List dense={true}>
                    {items &&
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
                        ))}
                </List>
            </Grid>
        </Grid>
    )
}
