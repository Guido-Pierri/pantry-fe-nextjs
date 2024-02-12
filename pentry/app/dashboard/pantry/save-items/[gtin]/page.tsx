import {fetchItemByGtin, fetchPantryByUserId} from "@/app/lib/data";
import AddItem from "@/app/ui/pantry/addItem";
import {auth} from "@/auth";

export default async function Page({params}: { params: { gtin: string } }) {
    const session = await auth()
    console.log('session in save-items', session)
    const token = session?.token;
    const userEmail = session?.user?.email
    const gtin = params.gtin;
    console.log('gtin', gtin)
    const item = await fetchItemByGtin(gtin);
    console.log('item', item)
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    console.log('userFromDatabase', userFromDatabase)
    if (!userFromDatabase) return null
    const id = userFromDatabase?.id
    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    console.log('pantryId', pantryId)
    return (
        <AddItem gtin={gtin} pantryId={pantryId} item={item}/>
    )
}
