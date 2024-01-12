import {fetchItemByGtin, fetchPantryByUserId, fetchUserByEmail} from "@/app/lib/data";
import AddItem from "@/app/ui/dashboard/addItem";
import {auth} from "@/auth";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);
    const user = await auth()
    const userEmail = user?.user?.email as string
    const userFromDatabase = await fetchUserByEmail(userEmail)
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    //const item = await fetchItemByGtin(gtin)
    return (
        <AddItem gtin={gtin} pantryId={pantryId} item={item}/>
    )
}
