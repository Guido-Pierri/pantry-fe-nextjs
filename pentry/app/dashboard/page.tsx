import {Cards} from '@/app/ui/dashboard/cards';

import {fetchUserById} from '@/app/lib/data';
import {auth} from "@/auth";
import {User} from "@/app/lib/definitions";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import Loading from "@/app/loading";

export default async function Page() {
    const session = await auth()
    const token = session?.token;
    console.log(token)
    if (!token) return null
    const databaseUser: User = session?.dbUser
    if (!databaseUser) return null
    const user = await fetchUserById(databaseUser?.id);
    const firstName = user?.firstName ?? '';
    const lastName = user?.lastName ?? '';

    return (

        user ? <RenderDashboard firstName={firstName} lastName={lastName}/> : Loading()
    );
}
