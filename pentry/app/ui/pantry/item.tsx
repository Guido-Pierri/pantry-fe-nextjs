import {CustomItem} from "@/app/lib/definitions";
import {PantryItemCard} from "@/app/ui/dashboard/cards";

const Item = ({item}: { item: CustomItem }) => {

    console.log('item in  UI component', item)
    return (

        <PantryItemCard item={item}/>
    )
}
export default Item
