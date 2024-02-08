import Table from "@/app/ui/admin-page/users/table";
import React from "react";
import {auth} from "@/auth";

export default async function Page() {

    const session = await auth()
    if (!session?.token) {
        return null
    }
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>Users</h1>
            </div>
            <Table/>

        </div>

    );
}
