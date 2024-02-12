'use client'
import {useFormState} from "react-dom";
import {registerUser, saveCustomItem} from "@/app/lib/actions";
import Link from "next/link";
import {Button} from "@/app/ui/button";
import React from "react";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {auth} from "@/auth";
import {getSession} from "next-auth/react";

export default async function CreateForm({categories}: { categories: string[] | undefined }) {

    const [errorMessage, dispatch] = useFormState(saveCustomItem, undefined);
    return <form action={dispatch}>
        <div className={'flex flex-col'}>

            <label htmlFor={"name"}>Enter name</label>
            <input id={"name"} name={"name"} type={"text"} placeholder={'Item name'} required={true}/>
            <label htmlFor={"category"}>Select a Category</label>


            <div>
                <select id={"category"} name={"category"} required={true}

                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {categories?.map((category) => (

                            <option key={category} value={category}>
                                {category}</option>
                        )
                    )}
                </select>

            </div>

            <label htmlFor={"expirationDate"}>When does it expire?</label>
            <input placeholder={'Expiration date'} id={"expirationDate"} name={"expirationDate"}
                   type={"date"}
                   required={true}
            />
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
                href="/dashboard/admin-page"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancel
            </Link>
            <Button type="submit">Save Item</Button>
        </div>
        <div
            className="flex h-8 items-end space-x-1"

        >
            {errorMessage ? <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{errorMessage}</p>
            </> : null}
        </div>
    </form>
}