import { fetchUserById } from "@/app/lib/data";
import { auth } from "@/auth";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import Loading from "@/app/loading";
import { changeIsFirstTimeUser } from "@/app/lib/actions";

export default async function Page() {
  const session = await auth();
  if (!session) return null;
  const user = session.user;
  console.log(user);
  if (!user) return null;
  if (user.isFirstTimeUser) await changeIsFirstTimeUser(user.id);
  const applicationUser = await fetchUserById(user?.id);
  return applicationUser ? <RenderDashboard user={user} /> : Loading();
}
