import {fetchPantryByUserId,} from '@/app/lib/data';
import {auth} from "@/auth";

import RenderPantry from "@/app/ui/pantry/RenderPantry";

export default async function Page() {
    const session = await auth()
    console.log('session in dashboard', session)
    const user = session?.user
    console.log('user in dashboard', user)
    const id = user?.id
    console.log('id in dashboard', id)
    if (!id) return null
    const pantry = await fetchPantryByUserId(id)
    console.log('pantry in dashboard', pantry)
    if (!pantry) return null

    return (
        <RenderPantry pantry={pantry} user={user}/>

    )
}



