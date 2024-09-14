import UsersTable from "@/app/ui/admin-page/users/users-table";
import React from "react";
import { auth } from "@/auth";
import Box from "@mui/material/Box";
import { fetchAllUsers } from "@/app/lib/data";
import Loading from "@/app/loading";
import { User } from "@/app/lib/definitions";
import { Session } from "next-auth";

export default async function Page() {
  const session: Session | null = await auth();
  if (!session?.token) {
    return null;
  }
  const users: User[] | null = await fetchAllUsers();
  return <Box>{users ? <UsersTable users={users} /> : <Loading />}</Box>;
}
