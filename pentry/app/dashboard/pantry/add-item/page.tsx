import CreateForm from '@/app/ui/add-item/create-form'
import {auth} from "@/auth";
import {fetchCategories} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import SearchBar from "@/app/ui/searchBar";
import Results from "@/app/ui/pantry/results";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const session = await auth();
    const query = searchParams?.query || '';
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
            <SearchBar placeholder={'search products...'}/>
            {(query.length > 0) ? (<Results query={query} currentPage={currentPage}/>) :
                <CreateForm categories={categories}/>}</>
    )

}