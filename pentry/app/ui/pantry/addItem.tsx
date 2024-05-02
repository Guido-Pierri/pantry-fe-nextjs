'use client';
import {saveSearchItem} from "@/app/lib/actions";
import {Item} from "@/app/lib/definitions";
import {Box} from "@mui/material";
import {AddItemCard} from "@/app/ui/dashboard/cards";
import {ITEM_IMAGE} from '@/app/lib/constants';

export default function AddItem({pantryId, gtin, item}: {
    pantryId: number,
    gtin: string
    item: Item
}) {


    const image: string | undefined = item?.image ?? ITEM_IMAGE;
    const name = item?.name;
    const category = item?.category;
    const brand = item?.brand;
    /* if (!pantryId || !gtin || !name || !category || !brand || !image) {
         return null;
     }*/
    console.log('item', item, 'pantryId', pantryId, 'gtin', gtin, 'category', category, 'brand', brand, 'image', image, 'name', name)

    const formAction = saveSearchItem.bind(null, pantryId, name, gtin, image, category, brand);

    return (
        <div className={'flex flex-col justify-center items-center '}>

            {formAction ? (<form action={formAction} className={'flex flex-col rounded-md '}>
                {item ? (
                    <Box sx={{position: 'relative'}}>
                        <AddItemCard item={item}/>
                    </Box>) : null}
                {/*<Image className={''} src={image} alt={name} width={500} height={500}/>
                            <Fab sx={{
                                position: 'absolute',
                                right: '10%',
                                bottom: '10%',
                                color: 'white',
                                backgroundColor: theme.palette.primary.main,
                            }}
                                 color={'inherit'}
                                 type={'submit'}>
                                <AddIcon/>
                            </Fab>
                        </Box>) : null}*/}


                {/*<label htmlFor={"quantity"}>Quantity</label>
                    <input id={"quantity"} name={"quantity"} type={"text"}/>*/}


            </form>) : null}
        </div>

    );


}