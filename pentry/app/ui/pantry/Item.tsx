import {CustomItem} from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import Link from "next/link";
import {Cards, PantryItemCard} from "@/app/ui/dashboard/cards";

const Item = ({item}: { item: CustomItem }) => {

    console.log('item in  UI component', item)
    return (

        <PantryItemCard item={item}>
        </PantryItemCard>
    )
}
export default Item
