import { fetchUserById } from "@/app/lib/data";
import { auth } from "@/auth";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import Loading from "@/app/loading";

export default async function Page() {
  const session = await auth();
  if (!session) return null;
  const user = session.user;
  if (!user) return null;
  const applicationUser = await fetchUserById(user?.id);
  if (!user) return null;
  return applicationUser ? <RenderDashboard user={user} /> : Loading();
}
