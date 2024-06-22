'use client';
import {SearchItem} from "@/app/lib/definitions";
import Link from "@mui/material/Link";
import {Box, Grid, Typography,} from "@mui/material";
import Image from "next/image";
import image from "@/app/images/404-error.png";
import {ResultCard} from "@/app/ui/dashboard/cards";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";

export interface SimpleDialogProps {
    items: SearchItem[];
    query: string;
}

export default function ResultsAsList(props: SimpleDialogProps) {
    const {query, items} = props;
    const initialItemList = 4; // Number of articles to display initially
    const incrementInitialItemList = 4; // Number of articles to add each time the "load more" button is clicke
    const [displayPosts, setDisplayPosts] = useState(initialItemList);
    const [results, setresults] = useState<SearchItem[]>(items || []);
    useEffect(() => {
        setresults(items);
    }, [query, items]);

    const loadMore = () => {
        setDisplayPosts(displayPosts + incrementInitialItemList)
    }
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(query);
        params.set('page', pageNumber.toString());
        return `${location?.pathname}?${params?.toString()}`;
    }
    //const items: SearchItem[] = page?.content;
    console.log('items', items)
    console.log('query in results', query)

    return (
        <Box mt={'2rem'}>
            <Grid container spacing={2} alignItems="stretch">
                {results?.length > 0 ? results?.slice(0, displayPosts).map((result, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
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
    );
}
