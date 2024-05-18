import SearchBar from "@/app/ui/searchBar";
import {auth} from "@/auth";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {SearchPage} from "@/app/lib/definitions";
import {searchPaginatedItems} from "@/app/lib/data";
import {Box} from "@mui/material";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ResultsDialog from "@/app/ui/search/results-dialog";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query ?? '';
    console.log('query in search page', query)
    const currentPage = Number(searchParams?.page) ?? 1;

    const session = await auth()
    if (!session?.token) {
        return null
    }
    const page = await searchPaginatedItems(query, session?.token, currentPage);
    if (!page) {
        return null;
    }
    const totalPages = page?.totalPages ?? 0;
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Breadcrumbs
                breadcrumbs={[{label: 'Dashboard', href: '/dashboard'}, {label: 'Search', href: '/dashboard/search'}]}/>
            <SearchBar placeholder={'What groceries do you need?'}/>
            {(query && query?.length > 0) ?
                <><Suspense fallback={<Loading/>}>
                    <ResultsDialog page={page} totalPages={totalPages} query={query}/>
                </Suspense>
                </>
                : null}

        </Box>


    );
}