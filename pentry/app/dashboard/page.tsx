import {Card} from '@/app/ui/dashboard/cards';

import {croissant, lusitana} from '@/app/ui/fonts';
import {
    fetchPantryByUserId, fetchUserById,
} from '@/app/lib/data';
import Link from "next/link";
import {auth} from "@/auth";


export default async function Page() {
    const session = await auth()
    const token = session?.token;
    if (!token) return null
    const databaseUser = session?.dbUser
    const user = await fetchUserById(databaseUser?.id as string)

    //if (!databaseUser) return null
    const items = await fetchPantryByUserId(databaseUser?.id as string)
    console.log('items', items)
    if (!items) return (<div>loading...</div>)
    return (
        <main>
            <h1 className={`${croissant.className} mb-4 text-xl md:text-2xl`}>
                Dashboard {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">

                {<Link href="/dashboard/pantry"><Card title="My Pantry"
                                                      value={items.items ? items.items.length : 'Your pantry is empty'}
                                                      type="items"/></Link>}
                {<Link href={"/dashboard/recipes"}><Card title="Recipes" value={0} type="recipes"/></Link>}
                {<Link href={"/dashboard/add-item"}><Card title="Add an item" value={''} type="addItem"/></Link>}
                {<Link href={"/dashboard/search"}><Card title="Search" value={''} type="search"/></Link>}

            </div>
        </main>
    );
}