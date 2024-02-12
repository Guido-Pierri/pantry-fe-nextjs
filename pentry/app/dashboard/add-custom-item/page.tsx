import AddItem from "@/app/ui/pantry/addItem";
import {auth} from "@/auth";
import {fetchPantryByUserId} from "@/app/lib/data";
import {useSession} from "next-auth/react";

export default async function Page() {
    const session = await auth()
    const userEmail = session?.user?.email as string
    const token = session?.token;
    if (!token) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    console.log('session', session)
    return (
        <AddItem pantryId={pantryId}/>
    );
}