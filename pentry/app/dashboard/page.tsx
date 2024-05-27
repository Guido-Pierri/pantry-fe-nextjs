import {fetchUserById} from '@/app/lib/data';
import {auth} from "@/auth";
import {User} from "@/app/lib/definitions";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import Loading from "@/app/loading";
import LoginPage from "@/app/login/page";

export default async function Page() {
    const session = await auth()
    console.log('session in dashboard', session)
    if (!session) return (<LoginPage/>)
    const token = session?.token;
    console.log(token)
    if (!token) return null
    const user: User = session?.user
    if (!user) return null
    const applicationUser = await fetchUserById(user?.id);
    if (!user) return null
    return (
        applicationUser ? <RenderDashboard user={user}/> : Loading()
    );
}
