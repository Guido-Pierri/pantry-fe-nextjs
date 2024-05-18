import SearchBar from "@/app/ui/searchBar";
import {auth} from "@/auth";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {Box} from "@mui/material";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ResultsDialog from "@/app/ui/search/results-dialog";
import {searchPaginatedItems} from "@/app/lib/data";

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

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Breadcrumbs
                breadcrumbs={[{label: 'Dashboard', href: '/dashboard'}, {label: 'Search', href: '/dashboard/search'}]}/>
            <SearchBar placeholder={'What groceries do you need?'}/>
            <Suspense fallback={<Loading/>}>
                <ResultsDialog searchParams={searchParams}/>
            </Suspense>
        </Box>


    );
}