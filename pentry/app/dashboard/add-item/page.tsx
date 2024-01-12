import AddItem from "@/app/ui/dashboard/addItem";
import {auth} from "@/auth";
import {fetchPantryByUserId, fetchUserByEmail} from "@/app/lib/data";

export default async function Page() {
    const user = await auth()
    const userEmail = user?.user?.email as string
    const userFromDatabase = await fetchUserByEmail(userEmail)
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)
    const pantryId = pantry?.id
    console.log('user', user)
    return (
        <AddItem pantryId={pantryId}/>
    );
}