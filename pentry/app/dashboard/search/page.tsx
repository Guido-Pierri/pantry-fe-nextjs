import SearchBar from "@/app/ui/search/searchBar";
import {auth} from "@/auth";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {Box} from "@mui/material";
import ResultsList from "@/app/ui/search/result-list";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const query = searchParams?.query ?? '';
    console.log('query', query)
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <SearchBar placeholder={'What groceries do you need?'}/>
            {query ?
                <Suspense fallback={<Loading/>}>
                    <ResultsList searchParams={searchParams} session={session}/>
                </Suspense>
                : null}
        </Box>


    );
}