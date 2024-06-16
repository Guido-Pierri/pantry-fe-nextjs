// Definition: Page for viewing a single item in the pantry
// Path: pentry/app/dashboard/pantry/item/page.tsx
/*const pageProps = {
    gtin: 'string',
}*/
import {fetchItemById, fetchPantryByUserId} from "@/app/lib/data";
import AddItem from "@/app/ui/pantry/addItem";
import {auth} from "@/auth";
import Image from "next/image";
import {CustomItem} from "@/app/lib/definitions";
import Item from "@/app/ui/pantry/item";

export default async function Page({params}: { params: { id: string } }) {
    const itemIid = params.id;
    const item: CustomItem = await fetchItemById(itemIid);
    console.log('item', item, 'gtin', itemIid)
    if (!item) return null
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return null

    const pantry = await fetchPantryByUserId(userId)
    const pantryId: number = pantry?.id as number
    return (

        <Item item={item}/>


    )
}
