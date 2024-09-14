"use client";
import { DeleteUser, UpdateUser } from "@/app/ui/admin-page/users/buttons";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { User } from "@/app/lib/definitions";
import { UserCard } from "@/app/ui/dashboard/cards";

export default async function UsersTable({ users }: { users: User[] }) {
  const { t } = useTranslation();
  console.log("users", users);

  return (
    <Box>
      <Typography color={"primary"} variant="h5">
        {t("text_users")}
      </Typography>

      <Box>
        {users?.map((user: User) => <UserCard key={user.id} user={user} />)}
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                User
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Email
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        user?.imageUrl?.includes("https", 0)
                          ? user?.imageUrl
                          : "https://i.pravatar.cc/28"
                      }
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${user?.firstName}'s profile picture`}
                    />
                    <p>{user?.firstName}</p>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-3">{user?.email}</td>
                {/*<td className="whitespace-nowrap px-3 py-3">
                                    {formatCurrency(invoice.amount)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {formatDateToLocal(invoice.date)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    <InvoiceStatus status={invoice.status} />
                                </td>*/}
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <UpdateUser id={user.id} />
                    <DeleteUser id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
