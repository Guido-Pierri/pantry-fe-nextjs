'use client';

import {User,} from '@/app/lib/definitions';
import {EnvelopeIcon, UserCircleIcon,} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateUser} from "@/app/lib/actions";

export default function EditUserForm({
                                         user,
                                     }: {
    user: User | null;
}) {
    if (!user) {
        return null;
    }
    const updateUserWithId = updateUser.bind(null, user?.id);

    return (
        <form action={updateUserWithId}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                        Edit first name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                defaultValue={user?.firstName}
                                placeholder="Enter first name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>

                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                        Edit last name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                defaultValue={user?.lastName}
                                placeholder="Enter last name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>

                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Edit email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user?.email}
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <EnvelopeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                </div>
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the user role
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="user"
                                    name="roles"
                                    type="radio"
                                    value="USER"
                                    defaultChecked={user?.roles === 'USER'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-white focus:ring-2"
                                />
                                <label
                                    htmlFor="user"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    USER
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="admin"
                                    name="roles"
                                    type="radio"
                                    value="ADMIN"
                                    defaultChecked={user?.roles === 'ADMIN'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="admin"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    ADMIN {/*<CheckIcon className="h-4 w-4"/>*/}
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/admin-page"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit User</Button>
            </div>
        </form>
    );
}