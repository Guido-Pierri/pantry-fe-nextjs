import CreateForm from '@/app/ui/add-item/create-form'
import {auth} from "@/auth";
import {fetchCategories} from "@/app/lib/data";
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

    const categories = await fetchCategories()
    if (!session?.token) {
        return null
    }
    if (!categories) {
        return null
    }
    console.log('categories', categories)
    return (
        <Box flex={'auto'} flexDirection={'column'} alignContent={'center'}>
            <CreateForm categories={categories}/>
        </Box>
    )

}