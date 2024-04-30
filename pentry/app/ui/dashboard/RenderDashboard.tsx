import {JSX} from "react";
import Link from "next/link";
import {Cards} from "@/app/ui/dashboard/cards";

export default function RenderDashboard({firstName, lastName}: { firstName: string, lastName: string }): JSX.Element {
    return (
        <>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                {`${firstName} ${lastName}`}&apos;s Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">

                {<Link href={"/dashboard/pantry"}><Cards title="My Pantry"
                                                         value={''}
                                                         type="items"/></Link>}
                {<Link href={"/dashboard/recipes"}><Cards title="Recipes" value={''} type="recipes"/></Link>}
                {<Link href={"/dashboard/pantry/add-item"}><Cards title="Add an item" value={''}
                                                                  type="addItem"/></Link>}
                {<Link href={"/dashboard/search"}><Cards title="Search" value={''} type="search"/></Link>}

            </div>
        </>
    );
}