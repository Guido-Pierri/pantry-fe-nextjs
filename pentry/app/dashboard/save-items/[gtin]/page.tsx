import {fetchItemByGtin, fetchPantryByUserId, fetchUserByEmail} from "@/app/lib/data";
import AddItem from "@/app/ui/dashboard/addItem";
import getServerSession from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Page({params}: { params: { gtin: string } }) {
    const gtin = params.gtin;
    const item = await fetchItemByGtin(gtin);
    const user = await getServerSession(authOptions)
    const userEmail = user?.user?.email as string
    const {id} = await fetchUserByEmail(userEmail)
    const {id: pantryId} = await fetchPantryByUserId(id)
    //const item = await fetchItemByGtin(gtin)
    return (
        <AddItem gtin={gtin} pantryId={pantryId} item={item}/>
    )
}
