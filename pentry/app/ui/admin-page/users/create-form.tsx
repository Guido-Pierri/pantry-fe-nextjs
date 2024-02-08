'use client';
import {UserField} from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon, EnvelopeIcon, ExclamationCircleIcon, KeyIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {registerUserByAdmin} from "@/app/lib/actions";
import {useFormState} from "react-dom";
import React, {useState} from "react";

export default function Form({users, roles}: {
    users: UserField[] | null
    roles: string[] | null
}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('createdBy', 'ADMIN');
        formData.append('authProvider', 'credentials')
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('roles', role);

        const formAction = registerUserByAdmin.bind(null, formData);
        formAction();
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                        Enter first name
                    </label>
                    <div className="relative">
                        <input
                            id="firstName"
                            name="firstName"
                            required={true}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10
                                        text-sm outline-2 placeholder:text-gray-500"
                            value={firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        />

                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                        Enter last name
                    </label>
                    <div className="relative">
                        <input
                            id="lastName"
                            name="lastName"
                            required={true}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10
                            text-sm outline-2 placeholder:text-gray-500"
                            value={lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        />

                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Enter email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required={true}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10
                            text-sm outline-2 placeholder:text-gray-500"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>


                        <EnvelopeIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        Enter password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required={true}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10
                            text-sm outline-2 placeholder:text-gray-500"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>

                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                        Confirm password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required={true}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10
                            text-sm outline-2 placeholder:text-gray-500"
                            value={confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}/>

                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <label htmlFor="role" className="mb-2 block text-sm font-medium">
                        Choose a role
                    </label>
                    <select
                        id="roles"
                        name="roles"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        value={role}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}>
                        <option value="" disabled>
                            Select a role
                        </option>
                        {roles?.map((role) => (
                            <option key={role} value={role}>
                                {role}

                            </option>
                        ))}

                    </select>
                </div>
                {/*{message && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                        <p className="text-sm text-red-500">{message}</p>
                    </>
                )}*/}
                {/* Invoice Amount */}
                {/*<div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose a role
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyDollarIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                </div>*/}

                {/* Invoice Status */}
                {/*<fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pending <ClockIcon className="h-4 w-4"/>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Paid <CheckIcon className="h-4 w-4"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>*/}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/admin-page"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create User</Button>
            </div>
        </form>
    );
}
