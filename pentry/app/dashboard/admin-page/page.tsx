import Table from "@/app/ui/admin-page/users/table";
import React from "react";

export default async function Page() {
    const deleteUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        deleteUser(event)
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>Users</h1>
            </div>
            {/*<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>*/}
            {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>*/}
            <Table /*query={query} currentPage={currentPage}*/ />
            {/*
            </Suspense>
*/}
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>

    );
}
