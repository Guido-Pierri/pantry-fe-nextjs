import Link from "next/link";
import {Card} from "@/app/ui/dashboard/cards";
import {Item} from "@/app/lib/definitions";
import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    const items = await fetchPantryByUserId(id)
    return (
        <main>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">
                {items?.items ? items.items.map((item: Item) =>
                    <Link key={item.id} href="/dashboard/pantry">
                        <Card title={item.name}
                              value={"Expires: " + item.expirationDate}
                              type="items"
                              item={item}/></Link>) : <div className={'flex flex-col'}>

                    <Link href={'/dashboard/add-item'}>start adding items to your pantry</Link>
                    <Link href={'/dashboard/search'}>or search for items</Link>

                </div>}
            </div>
        </main>
    )
}



