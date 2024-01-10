import Link from "next/link";
import {croissant} from "@/app/ui/fonts";
import {Button} from "@nextui-org/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center">

                <h1 className={`${croissant.className} text-4xl font-bold  text-center mt-8 text-blue-400`}>
                    Welcome to Pantry Partner!
                </h1>
                <p className="text-xl text-center mt-4 text-blue-400">
                    manage groceries and minimize food waste
                </p>

                <Button className={'bg-blue-400 text-white'} as={Link} href={"/auth/signin"}> Sign In
                </Button>
            </div>
        </main>
    )
}
