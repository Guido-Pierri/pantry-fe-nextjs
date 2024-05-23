import {fetchUserById} from '@/app/lib/data';
import {auth} from "@/auth";
import {User} from "@/app/lib/definitions";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import Loading from "@/app/loading";

export default async function Page() {
    const session = await auth()
    console.log('session in dashboard', session)
    if (!session) return null
    const token = session?.token;
    console.log(token)
    if (!token) return null
    const databaseUser: User = session?.dbUser
    if (!databaseUser) return null
    const user = await fetchUserById(databaseUser?.id);
    if (!user) return null
    return (
        databaseUser ? <RenderDashboard user={databaseUser}/> : Loading()
    );
}
