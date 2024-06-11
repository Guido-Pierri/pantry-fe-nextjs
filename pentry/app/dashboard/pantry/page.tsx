import {fetchPantryByUserId,} from '@/app/lib/data';
import {auth} from "@/auth";

import RenderPantry from "@/app/ui/pantry/RenderPantry";

export default async function Page() {
    const session = await auth()
    const user = session?.user
    const id = user?.id
    if (!id) return null
    const pantry = await fetchPantryByUserId(id)
    if (!pantry) return null

    return (
        <RenderPantry pantry={pantry} user={user}/>
    )
}



