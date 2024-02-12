// Definition: Page for viewing a single item in the pantry
// Path: pentry/app/dashboard/pantry/item/page.tsx
/*const pageProps = {
    gtin: 'string',
}*/
import Item from "@/app/ui/pantry/Item";
import {fetchItemByGtin, fetchPantryByUserId} from "@/app/lib/data";
import item from "@/app/ui/dashboard/Item";
import AddItem from "@/app/ui/pantry/addItem";
import {auth} from "@/auth";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);

    console.log('item in page', item)
    if (!item) return null
    console.log('item in component', item)
    const session = await auth()
    const user = session?.user
    const id = user?.id
    if (!id) return null

    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    return (
        <div>
            <AddItem gtin={gtin} pantryId={pantryId} item={item}/>
        </div>
    )
}