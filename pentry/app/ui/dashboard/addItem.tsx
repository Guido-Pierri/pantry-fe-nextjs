'use client';
import {addItem} from "@/app/lib/actions";
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type={"submit"}
                    aria-disabled={pending}>
                add item
            </button>
        );
    }

    const image = item?.image;
    const name = item?.name;
    const category = item?.category;
    const brand = item?.brand;
    if (name != undefined && image != undefined && pantryId != undefined && gtin != undefined && category != undefined && brand != undefined) {
        const formAction = addItem.bind(null, pantryId, name, gtin, image, category, brand,);

        return (
            <div className={'flex flex-col justify-center items-center'}>
                {image && name ? (
                    <>
                        <h2>{name}</h2>
                        <Image className={'rounded'} src={image} alt={name} width={500} height={500}/>
                    </>) : null}
                {formAction ? (<form action={formAction} className={'flex flex-col'}>
                    {!item?.name && category ? (<><label htmlFor={"name"}>Enter name</label>
                        <input id={"name"} name={"name"} type={"text"} required={true}/>
                        <label htmlFor={"category"}>Category</label>
                        <input id={"category"} name={"category"} type={"text"} required={true}/>
                        <label htmlFor={"image"}>Image</label>
                        <input id={"image"} name={"image"} type={"text"} required={true}/></>) : null}

                    {/*<label htmlFor={"quantity"}>Quantity</label>
                    <input id={"quantity"} name={"quantity"} type={"text"}/>*/}
                    <label htmlFor={"expirationDate"}></label>
                    <input placeholder={'Expiration date'} id={"expirationDate"} name={"expirationDate"} type={"date"}
                           required={true}/>

                    <SubmitButton/>
                </form>) : null}
            </div>

        );
    }
}