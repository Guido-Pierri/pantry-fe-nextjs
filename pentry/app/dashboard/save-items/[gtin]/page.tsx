import {fetchItemByGtin, fetchPantryByUserId, fetchUserByEmail} from "@/app/lib/data";
import AddItem from "@/app/ui/dashboard/addItem";
import {auth} from "@/auth";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);
    const user = await auth()
    const session = await auth()
    const token = session?.token;
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = await fetchUserByEmail(userEmail, token)
    if (!userFromDatabase) return null
    const id = userFromDatabase?.id
    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    console.log('pantryId', pantryId)
    return (
        <AddItem gtin={gtin} pantryId={pantryId} item={item}/>
    )
}
