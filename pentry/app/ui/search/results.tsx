'use client';
import {searchPaginatedItems} from "@/app/lib/data";
import {SearchPage} from "@/app/lib/definitions";
import Link from "next/link";
import {
    Avatar,
    Box, Button,
    Dialog,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import image from "@/app/images/404-error.png";
import {blue} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import {useState} from "react";
import Pagination from "@/app/ui/search/pagination";

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    page: SearchPage;
    totalPages: number;
}

export async function Results(props: SimpleDialogProps) {
    const {open, totalPages} = props;

    const handleClose = () => {
    };


    const page = props.page;
    if (!page) return null;
    const items = page.content;
    console.log('page', page)
    return (

        <Dialog open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List dense={true}>
                {items.length > 0 ? items?.map((item) => (

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
            <Pagination totalPages={totalPages}/>

        </Dialog>
    )
}


export default function ResultsDialog({

                                          page, totalPages
                                      }: {
    page: SearchPage;
    totalPages: number;
}) {
    const [open, setOpen] = useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="subtitle1" component="div">
            </Typography>
            <br/>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <Results
                open={open}
                onClose={handleClose}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
}