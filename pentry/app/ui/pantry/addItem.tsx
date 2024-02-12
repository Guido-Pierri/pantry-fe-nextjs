'use client';
import {saveSearchItem} from "@/app/lib/actions";
import {useFormStatus} from "react-dom";
import {Item} from "@/app/lib/definitions";
import Image from "next/image";

export default function AddItem({pantryId, gtin, item}: {
    pantryId?: number | undefined,
    gtin?: string | undefined
    item?: Item | undefined
}) {
    function SubmitButton() {
        const {pending} = useFormStatus();
        return (
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-2 rounded ml-auto"
                type={"submit"}
                aria-disabled={pending}>
                Add item
            </button>
        );
    }

    const image = item?.image;
    const name = item?.name;
    const category = item?.category;
    const brand = item?.brand;
    console.log('item', item, 'pantryId', pantryId, 'gtin', gtin, 'category', category, 'brand', brand, 'image', image, 'name', name)
    if (name != undefined && image != undefined && pantryId != undefined && gtin != undefined && category != undefined && brand != undefined) {
        const formAction = saveSearchItem.bind(null, pantryId, name, gtin, image, category, brand,);

        return (
            <div className={'flex flex-col justify-center items-center '}>

                {formAction ? (<form action={formAction} className={'flex flex-col rounded-md '}>
                    {image && name ? (
                        <>
                            <Image className={''} src={image} alt={name} width={500} height={500}/>
                        </>) : null}
                    {!item?.name && category ? (<><label htmlFor={"name"}>Enter name</label>
                        <input id={"name"} name={"name"} type={"text"} required={true}/>
                        <label htmlFor={"category"}>Category</label>
                        <input id={"category"} name={"category"} type={"text"} required={true}/>
                        <label htmlFor={"image"}>Image</label>
                        <input id={"image"} name={"image"} type={"text"} required={true}/></>) : null}

                    {/*<label htmlFor={"quantity"}>Quantity</label>
                    <input id={"quantity"} name={"quantity"} type={"text"}/>*/}
                    <div className={'font-bold text-l bg-gray-100 rounded-md mt-2'}>Save this item to your pantry?
                    </div>
                    <label className={'mt-2'} htmlFor={"expirationDate"}>Set the expiration date</label>
                    <input placeholder={'Expiration date'} id={"expirationDate"} name={"expirationDate"} type={"date"}
                           required={true}/>

                    <SubmitButton/>
                </form>) : null}
            </div>

        );
    }

}