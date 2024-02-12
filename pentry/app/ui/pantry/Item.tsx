import {CustomItem} from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import Link from "next/link";
import {Card} from "@/app/ui/dashboard/cards";

const Item = ({item}: { item: CustomItem }) => {

    console.log('item in  UI component', item)
    return (

        <><Card title={item.name} value={item.brand} type={'items'} item={item}>
        </Card><Link href={`/dashboard/pantry/save-items/${item.gtin}`}><Button className="mt-4 w-full">
            Save to Pantry
        </Button></Link></>
    )
}
export default Item
