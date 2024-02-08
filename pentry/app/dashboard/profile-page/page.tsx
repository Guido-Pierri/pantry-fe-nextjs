import Table from "@/app/ui/profile-page/table";
import React from "react";
import {getSession} from "next-auth/react";
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    if (!session?.token) {
        return null
    }
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>User profile</h1>
            </div>
            {id ? (<Table id={id}/*query={query} currentPage={currentPage}*/ />) : null}
            <div className="mt-5 flex w-full justify-center">
            </div>
        </div>

    );
}
