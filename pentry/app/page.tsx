import Link from "next/link";
import {croissant} from "@/app/ui/fonts";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center">

                <Link className={`${croissant.className} text-2xl font-bold  text-center mt-8 text-blue-400`} href={"/dashboard"}>
                    Pantry Partner!
                </Link>
                <p className="text-l text-center mt-4 ">
                    Manage groceries and minimize food waste
                </p>

            </div>
        </main>
    )
}
