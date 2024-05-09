import Table from "@/app/ui/profile-page/table";
import React from "react";
import {getSession} from "next-auth/react";
import {auth} from "@/auth";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    const user = session?.user;
    if (!session?.token || !user) {
        return null
    }
    return (
        <div className="w-full">
            <Breadcrumbs breadcrumbs={[
                {label: 'Dashboard', href: '/dashboard'},
                {
                    label: 'Profile Page',
                    href: '/dashboard/profile-page',
                    active: true,
                },
            ]}/>
            {id ? <Table user={user}/> : null}
            <div className="mt-5 flex w-full justify-center">
            </div>
        </div>

    );
}
