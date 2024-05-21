import CreateForm from '@/app/ui/add-item/create-form'
import {auth} from "@/auth";
import {fetchCategories} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import {Box} from "@mui/material";
import {Suspense} from "react";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const session = await auth();
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const categories = await fetchCategories()
    if (!session?.token) {
        return null
    }
    if (!categories) {
        return null
    }
    console.log('categories', categories)
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
                {/*<Link href={'/dashboard/search'}><Fab color={'primary'} variant="extended">
                    <SearchIcon/>
                    Search for a product
                </Fab></Link>*/}
            </Box>
        </>
    )

}