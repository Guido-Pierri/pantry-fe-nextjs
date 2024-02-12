// Definition: Page for viewing a single item in the pantry
// Path: pentry/app/dashboard/pantry/item/page.tsx
/*const pageProps = {
    gtin: 'string',
}*/
import {fetchItemByGtin, fetchPantryByUserId} from "@/app/lib/data";
import AddItem from "@/app/ui/pantry/addItem";
import {auth} from "@/auth";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);

    if (!item) return null
    const session = await auth()
    const id = session?.user?.id
    if (!id) return null

    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    return (

        <AddItem gtin={gtin} pantryId={pantryId} item={item}/>

    )
}