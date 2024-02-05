import {auth} from "@/auth";
import {fetchAllUsers} from "@/app/lib/data";
import Table from "@/app/ui/admin-page/users/table";
import {Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode} from "react";

export default async function Page() {
    const session = await auth();
    const user = session?.dbUser;
    const allUsers = await fetchAllUsers();

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
        /*
            <>
                <div className={'text-3xl'}>Admin Page</div>
                <div>
                    Users: {allUsers ? allUsers.length : 0}
                </div>
                <div className={'grid grid-cols-3 border-2 font-extrabold'}>
                    <div className={''}>Id</div>
                    <div>Name</div>
                    <div>Modify</div>
                </div>
                {allUsers ? (allUsers.map((user: {
                    id: Key | null | undefined;
                    firstName: string | undefined;
                    lastName: string | undefined;
                }) => {
                    return (
                        <div className={'grid grid-cols-3 border-2 items-center'} key={user.id}>
                            <div>{user?.id as number}</div>
                            <div className={'cursor-pointer'}>
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className={'flex justify-end'}>
                                <button className={'bg-blue-500 text-white p-2 rounded-md'}>Edit</button>
                                <button className={'bg-red-500 text-white p-2 rounded-md ml-2'}
                                >Delete
                                </button>
                            </div>
                        </div>
                    );
                })) : <div>loading...</div>}
            </>
                */
    );
}
