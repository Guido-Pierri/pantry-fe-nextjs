import CreateForm from '@/app/ui/add-item/create-form'
import {auth} from "@/auth";
import {fetchCategories} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function Page() {
    const session = await auth();
    const categories = await fetchCategories() || undefined
    if (!session?.token) {
        return null
    }
    return (
        <><Breadcrumbs
            breadcrumbs={[
                {label: 'Dashboard', href: '/dashboard'},
                {
                    label: 'Add Item',
                    href: '/dashboard/add-item',
                    active: true,
                },
            ]}/><CreateForm categories={categories}/></>
    )

}