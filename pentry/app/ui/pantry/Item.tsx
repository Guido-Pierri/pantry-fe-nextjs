import {CustomItem} from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import Link from "next/link";
import {Cards} from "@/app/ui/dashboard/cards";

const Item = ({item}: { item: CustomItem }) => {

    console.log('item in  UI component', item)
    return (

        <><Cards title={item.name} value={item.brand} type={'items'} item={item}>
        </Cards><Link href={`/dashboard/pantry/save-items/${item.gtin}`}><Button className="mt-4 w-full">
            Save to Pantry
        </Button></Link></>
    )
}
export default Item
