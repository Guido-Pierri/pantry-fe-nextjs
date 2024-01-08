'use client';
import {addItem} from "@/app/lib/actions";
import {useFormState, useFormStatus} from "react-dom";
import {auth} from "@/auth";
import {fetchUserByEmail} from "@/app/lib/data";

const initialState = undefined;
export default function AddItem({pantryId, gtin, image}: {
    pantryId?: number | undefined,
    gtin?: string | undefined
    image?: string | undefined
}) {
    const formAction = addItem.bind(null, pantryId as number, gtin as string, image as string);


    function SubmitButton() {
        const {pending} = useFormStatus();
        return (
            <button type={"submit"} aria-disabled={pending}>
                add item
            </button>
        );
    }

    //const formAction = updateUser.bind(null, userId)

    return (
        <form action={formAction} className={'flex flex-col'}>
            <label htmlFor={"name"}>Enter name</label>
            <input id={"name"} name={"name"} type={"text"}/>
            <label htmlFor={"quantity"}>Quantity</label>
            <input id={"quantity"} name={"quantity"} type={"text"}/>
            <label htmlFor={"expirationDate"}>Expiration Date</label>
            <input id={"expirationDate"} name={"expirationDate"} type={"date"}/>
            <label htmlFor={"image"}>Image</label>
            <input id={"image"} name={"image"} type={"text"}/>
            <SubmitButton/>
        </form>

    );
}