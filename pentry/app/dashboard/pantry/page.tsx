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
import {PantryItemCard} from "@/app/ui/dashboard/cards";
import Image from "next/image";
import pantryPic from '@/app/images/shelving.png';

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
    const pantry = await fetchPantryByUserId(id)
    return (
        <div>
            {pantry ? pantry?.items.map((item: Item) =>
                    <PantryItemCard key={item?.id} item={item}/>
                )

                : <div className='flex flex-col justify-between items-center md:justify-around relative'>
                    <div className={'font-bold text-xl'}>Your pantry is empty</div>
                    <Image
                        src={pantryPic}
                        alt={"Empty pantry"}
                        priority={true} // {false} | {true}

                    />
                    <Link href={'/dashboard/pantry/add-item'} className={'absolute right-9 top-2/3'}><Fab
                        color="primary"
                        aria-label="add"
                        variant={'extended'}>
                        <AddIcon/>Add Items
                    </Fab></Link>
                </div>}


        </div>
    )
}



