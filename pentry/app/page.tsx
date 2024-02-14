import Link from "next/link";
import {croissant, lusitana, redressed} from "@/app/ui/fonts";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center">

                <h1 className={`${croissant.className} text-4xl font-bold  text-center mt-8 text-blue-400`}>
                    Welcome to Pantry Partner!
                </h1>
                <p className="text-xl text-center mt-4 ">
                    manage groceries and minimize food waste
                </p>

                <Link
                    className={`${croissant.className} flex items-center justify-center mt-8 px-4 text-white bg-blue-500 rounded-md`}
                    href="/dashboard">
                    <ArrowRightEndOnRectangleIcon className={'h-5 w-5'}/>
                    <p className={'ml-2'}>
                        Log In
                    </p>
                </Link>
            </div>
        </main>
    )
}
