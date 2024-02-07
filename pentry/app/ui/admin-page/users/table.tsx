import {DeleteUser, UpdateUser} from "@/app/ui/admin-page/users/buttons";
import {fetchAllUsers} from "@/app/lib/data";
import Image from "next/image";

export default async function UsersTable() {
    const users = await fetchAllUsers();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {users?.map((user) => (
                            <div
                                key={user.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <Image
                                                src={user?.imageUrl?.includes('https', 0) ? user?.imageUrl : 'https://i.pravatar.cc/28'}
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${user?.firstName}'s profile picture`}
                                            />
                                            <p className={'ml-2'}>{user.firstName}</p>
                                            <p className={'ml-1'}>{user.lastName}</p>

                                        </div>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        <p className="text-sm text-gray-500">{user.roles}</p>
                                    </div>
                                    {/*<InvoiceStatus status={invoice.status} />*/}
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    {/*<div>
                                        <p className="text-xl font-medium">
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p>{formatDateToLocal(invoice.date)}</p>
                                    </div>*/}
                                    <div className="flex justify-end gap-2">
                                        <UpdateUser id={user.id}/>
                                        <DeleteUser id={user.id}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                User
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Role
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {users?.map((user) => (
                            <tr
                                key={user.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={user?.imageUrl?.includes('https', 0) ? user?.imageUrl : 'https://i.pravatar.cc/28'}
                                            className="rounded-full"
                                            width={28}
                                            height={28}
                                            alt={`${user?.firstName}'s profile picture`}
                                        />
                                        <p>{user.firstName}</p>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.email}
                                </td>
                                {/*<td className="whitespace-nowrap px-3 py-3">
                                    {formatCurrency(invoice.amount)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {formatDateToLocal(invoice.date)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    <InvoiceStatus status={invoice.status} />
                                </td>*/}
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <UpdateUser id={user.id}/>
                                        <DeleteUser id={user.id}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}