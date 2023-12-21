import Button from '@/app/components/Button'
//import { useNavigate } from 'react-router-dom'
type Props = { item: any; daysBetween: any; today: any }
const Item = ({ item, daysBetween, today }: Props) => {
    //const navigate = useNavigate()

    /*function navigateToItem(item:any) {
        if (item) {
            console.log('in navigateToItem')
            console.log('item', item)
            console.log('in  item.id', item.id)
            navigate(`/itemdetail/${item.id}`) // Assuming `item` has an `id` property
        }
    }*/
    return (
        <div className="">
            {item && item.image && (
                <div className="">
                    {/*{console.log(item?.image)}*/}
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
                <Button title={'view'} /*onClick={() => navigateToItem(item)}*/ ></Button>
            )}
        </div>
    )
}
export default Item
