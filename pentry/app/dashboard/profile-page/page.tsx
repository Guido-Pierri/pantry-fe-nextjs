import Table from "@/app/ui/profile-page/table";
import React from "react";
import {getSession} from "next-auth/react";
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>User profile</h1>
            </div>
            {/*<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>*/}
            {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>*/}
            {id ? (<Table id={id}/*query={query} currentPage={currentPage}*/ />) : null}
            {/*
            </Suspense>
*/}
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>

    );
}
