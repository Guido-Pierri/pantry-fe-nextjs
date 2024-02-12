import Link from "next/link";
import {Card} from "@/app/ui/dashboard/cards";
import {Item} from "@/app/lib/definitions";
import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    console.log('token', token)
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)
    console.log('pantry?.items', pantry?.items)
    return (
        <main>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">
                {pantry?.items ? (pantry.items.map((item: Item) =>

                    <Card key={item.id} title={item.name}
                          value={"Expires: " + item.expirationDate}
                          type="items"
                          item={item}/>
                )) : null}

            </div>
        </main>
    )
}



