import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import {ArrowRightEndOnRectangleIcon, ClipboardIcon, PowerIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {auth, signOut} from '@/auth';
import {croissant} from "@/app/ui/fonts";
import {Session} from "next-auth";
import {User} from "@/app/lib/definitions";

export default async function SideNav() {
    const session = await auth();
    const user = session?.user as User;
    const roles = user?.roles;
    const isAdmin = roles === 'ADMIN';
    const isUser = roles === 'USER';

    /*if (!session?.token) return null;*/

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className={`${croissant.className} text-3xl text-white mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40`}
                href="/"
            >Pantry Partner

            </Link>
            <div className="flex grow flex-row justify-evenly space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {session?.token ? (<NavLinks roles={roles}/>) : null}
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                {/*{isAdmin ? (
                    <Link
                        className="flex flex-col grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        href={'/dashboard/admin-page'}>
                        <ClipboardIcon className="w-6"/>
                        <div className="">Admin Page</div>
                    </Link>) : null}
                {isUser ? (
                    <Link
                        className="flex flex-col grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        href={'/dashboard/profile-page'}>
                        <UserCircleIcon className="w-6"/>
                        <div className="">Profile Page</div>
                    </Link>) : null}*/}
                {/*//TODO: show a button or link to profile page*/}
                {session?.token ? (<form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >

                    <button
                        className="flex flex-col w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6"/>
                        <div className="">Sign Out</div>
                    </button>
                </form>) : <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >

                    <button
                        className="flex flex-col w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <ArrowRightEndOnRectangleIcon className="w-6"/>
                        <div className="">Sign In</div>
                    </button>
                </form>}
            </div>
        </div>
    );
}