'use client';
import {SearchItem, SearchPage} from "@/app/lib/definitions";
import Link from "next/link";
import {Box, List, ListItem, Typography,} from "@mui/material";
import Image from "next/image";
import image from "@/app/images/404-error.png";
import {ResultCard} from "@/app/ui/dashboard/cards";

export interface SimpleDialogProps {
    page: SearchPage;
    totalPages: number;
    query: string;
    currentPage: number;
}

export default function ResultsAsList(props: SimpleDialogProps) {
    const {totalPages, query, currentPage, page} = props;


    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(query);
        params.set('page', pageNumber.toString());
        return `${location?.pathname}?${params?.toString()}`;
    }
    const items: SearchItem[] = page?.content;
    console.log('page', page)
    console.log('query in results', query)
    return (

        <Box>
            <List>
                {items?.length > 0 ? items?.map((item) => (

                    <Link href={`/dashboard/pantry/add-item/items/${item.gtin}`} key={item.gtin}>
                        <ListItem key={item.gtin}>
                            <ResultCard item={item}></ResultCard>
                        </ListItem>
                    </Link>
                )) : <Box display={"flex"} flexDirection={'column'} alignItems="center" mt={10}
                >
                    <Typography variant={'h5'}>No results found</Typography>
                    <Image src={image} alt={'not found'}/></Box>}
            </List>
        </Box>
    );
}