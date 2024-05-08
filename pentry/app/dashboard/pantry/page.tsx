import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";

import RenderPantry from "@/app/ui/pantry/RenderPantry";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    if (!id) return null
    const pantry = await fetchPantryByUserId(id)
    if (!pantry) return null

    return (
        <RenderPantry pantry={pantry} userFromDatabase={userFromDatabase}/>

    )
}



