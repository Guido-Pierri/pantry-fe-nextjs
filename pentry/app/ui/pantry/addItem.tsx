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
    const formAction = saveSearchItem.bind(null, pantryId, name, gtin, image, category, brand);

    return (
        <Box>
            {formAction ? (<form action={formAction}>
                {item ? (
                    <Box sx={{position: 'relative'}}>
                        <AddItemCard item={item}/>
                    </Box>) : null}
            </form>) : null}
        </Box>

    );


}