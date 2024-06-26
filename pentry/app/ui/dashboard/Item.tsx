import {CustomItem} from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import Link from "next/link";
import {Cards} from "@/app/ui/dashboard/cards";

const Item = ({item}: { item: CustomItem }) => {

    console.log('item in  UI component', item)
    return (

        <><Cards title={item.name} value={item.brand} type={'items'} item={item}>
            {/*{item && item.image && (<Image src={item.image} width={500} height={500} alt=""/>)}*/}

            {/*{item && item.image && (
        <div className="">
            {console.log(item?.image)}
            <img src={item?.image} alt="" />
        </div>
    )}

    <div className="">
        {item?.name + ' - ' + item?.quantity}
        {item.expirationDate && (
            <div className="text-danger">
                Expiration date: {item.expirationDate}
                <div>
                    Expires in {''}
                    {daysBetween(new Date(today), new Date(item.expirationDate))} days
                </div>
            </div>
        )}
    </div>
    {item && (
        <Button title={'view'} /*onClick={() => navigateToItem(item)} ></Button>
    )}*/}
        </Cards><Link href={`/dashboard/save-items/${item.gtin}`}><Button className="mt-4 w-full">
            Save to Pantry
        </Button></Link></>
    )
}
export default Item
