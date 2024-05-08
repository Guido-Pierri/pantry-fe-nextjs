import CreateForm from '@/app/ui/add-item/create-form'
import {auth} from "@/auth";
import {fetchCategories} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import SearchBar from "@/app/ui/searchBar";
import Results from "@/app/ui/search/results";
import Loading from "@/app/loading";
import {Suspense} from "react";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import Fab from "@mui/material/Fab";
import {MagnifyingGlassCircleIcon} from "@heroicons/react/24/outline";
import {Box} from "@mui/material";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const session = await auth();
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const categories = await fetchCategories() || undefined
    if (!session?.token) {
        return null
    }
    return (
        <><Breadcrumbs
            breadcrumbs={[
                {label: 'My Pantry', href: '/dashboard/pantry'},
                {
                    label: 'Add Item',
                    href: '/dashboard/pantry/add-item',
                    active: true,
                },
            ]}/>
            <Box flex={'auto'} flexDirection={'column'} alignContent={'center'}>

                <CreateForm categories={categories}/>
                <Link href={'/dashboard/search'}><Fab variant="extended">
                    <SearchIcon/>
                    Search for a product
                </Fab></Link>
            </Box>
        </>
    )

}