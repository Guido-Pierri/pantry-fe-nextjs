// Definition: Page for viewing a single item in the pantry
// Path: pentry/app/dashboard/pantry/item/page.tsx
/*const pageProps = {
    gtin: 'string',
}*/
import Item from "@/app/ui/dashboard/Item";
import {fetchItemByGtin} from "@/app/lib/data";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);
    console.log('item in component', item)
    return (
        <div>
            <Item item={item}/>
        </div>
    )
}