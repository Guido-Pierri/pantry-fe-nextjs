import Link from "next/link";
import {Item} from "@/app/lib/definitions";
import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import {Button} from "@/app/ui/button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Card, CardHeader, CardMedia} from "@mui/material";
import theme from "@/theme";
import {blue} from "@mui/material/colors";
import {PantryItemCard} from "@/app/ui/dashboard/cards";


export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    console.log('token', token)
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    const pantry = await fetchPantryByUserId(id)
    console.log('pantry?.items', pantry?.items)
    return (
        <main>
            <div className='grid gap-6 grid-cols-2 md:grid-cols-4'>
                <Link href={'/dashboard/pantry/add-item'} className={'fixed bottom-10 right-8'}><Fab
                    color="primary"
                    aria-label="add"
                    variant={'extended'}>
                    <AddIcon/>Add Items
                </Fab></Link>
                {pantry?.items ? (pantry.items.map((item: Item) =>

                    /*<Card key={item.id} title={item.name}
                          value={"Expires: " + item.expirationDate}
                          type='pantryItem'
                          item={item}/>*/
                    <PantryItemCard item={item}/>
                )) : null}

            </div>
        </main>
    )
}



