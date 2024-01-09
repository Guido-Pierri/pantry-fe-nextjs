'use client';
import {addItem} from "@/app/lib/actions";
import {useFormState, useFormStatus} from "react-dom";
import {auth} from "@/auth";
import {fetchUserByEmail} from "@/app/lib/data";
import {Item} from "@/app/lib/definitions";
import Image from "next/image";

const initialState = undefined;
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
    if (image != undefined && pantryId != undefined && gtin != undefined) {
        const formAction = addItem.bind(null, pantryId, gtin, image);


        //const formAction = updateUser.bind(null, userId)

        return (
            <div className={'flex flex-col justify-center items-center'}>
                {image && name ? (
                    <Image className={'rounded'} src={image} alt={name} width={200} height={200}/>) : null}
                {formAction ? (<form action={formAction} className={'flex flex-col'}>
                    {!item?.name && category ? (<><label htmlFor={"name"}>Enter name</label>
                        <input id={"name"} name={"name"} type={"text"}/>
                        <label htmlFor={"category"}>Category</label>
                        <input id={"category"} name={"category"} type={"text"}/>
                        <label htmlFor={"image"}>Image</label>
                        <input id={"image"} name={"image"} type={"text"}/></>) : null}

                    {/*<label htmlFor={"quantity"}>Quantity</label>
                    <input id={"quantity"} name={"quantity"} type={"text"}/>*/}
                    <label htmlFor={"expirationDate"}></label>
                    <input placeholder={'Expiration date'} id={"expirationDate"} name={"expirationDate"} type={"date"}/>

                    <SubmitButton/>
                </form>) : null}
            </div>

        );
    }
}