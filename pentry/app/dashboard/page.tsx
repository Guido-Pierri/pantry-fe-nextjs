import {Card} from '@/app/ui/dashboard/cards';

import {croissant, lusitana, redressed} from '@/app/ui/fonts';
import {
    fetchPantryByUserId, fetchUserById,
} from '@/app/lib/data';
import Link from "next/link";
import {auth, signOut} from "@/auth";
import {signOutUser} from "@/app/lib/actions";
import {ArrowRightEndOnRectangleIcon, PowerIcon} from "@heroicons/react/24/outline";


export default async function Page() {
    const session = await auth()
    const token = session?.token;
    console.log(token)
    if (!token) return null
    const databaseUser = session?.dbUser
    const user = await fetchUserById(databaseUser?.id as string)


    const items = await fetchPantryByUserId(databaseUser?.id as string)
    if (!items) return (<div>loading...</div>)
    return (
        <main>
            <h1 className={`${croissant.className} mb-4 text-xl md:text-2xl`}>
                {`${user?.firstName} ${user?.lastName}`}'s Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">

                {<Link href="/dashboard/pantry"><Card title="My Pantry"
                                                      value={''}
                                                      type="items"/></Link>}
                {<Link href={"/dashboard/recipes"}><Card title="Recipes" value={''} type="recipes"/></Link>}
                {<Link href={"/dashboard/pantry/add-item"}><Card title="Add an item" value={''} type="addItem"/></Link>}
                {<Link href={"/dashboard/search"}><Card title="Search" value={''} type="search"/></Link>}

            </div>
        </main>
    );
}