'use client';
import {SearchPage} from "@/app/lib/definitions";
import Link from "next/link";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Toolbar,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import image from "@/app/images/404-error.png";
import {useState} from "react";
import Pagination from "@/app/ui/search/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useContext} from 'react';
import {OpenDialogContext} from './open-dialog-context';

export interface SimpleDialogProps {
    page: SearchPage;
    totalPages: number;
    query: string;
}

export function Results(props: SimpleDialogProps) {
    const {open, setOpen} = useContext(OpenDialogContext);
    const [searchQuery, setSearchQuery] = useState('');

    const {totalPages, query} = props;

    const page = props.page;

    if (!page) return null;


// Inside your component

    const items = page.content;
    console.log('page', page)
    console.log('query in results', query)
    const handleClose = () => {
        console.log('handle close')
        setSearchQuery('')
        if (setOpen) {
            setOpen(false);
        }
        console.log('open', open)
    };
    return (

        <Dialog open={open}
                onClose={() => handleClose()}>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose()}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Results for &#34;{query}&#34;
                    </Typography>
                </Toolbar>
            </AppBar>
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
    );
}


export default function ResultsDialog({

                                          page, totalPages, query
                                      }: {
    page: SearchPage;
    totalPages: number;
    query: string;
}) {


    console.log('query in results dialog', query)
    return (
        <div>
            <Typography variant="subtitle1" component="div">
            </Typography>
            <Results
                page={page}
                totalPages={totalPages}
                query={query}
            />
        </div>
    );
}