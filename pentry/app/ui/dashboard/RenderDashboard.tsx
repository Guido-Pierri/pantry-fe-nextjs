"use client";
import { Box, Typography } from "@mui/material";
import { User } from "@/app/lib/definitions";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import AddButtonRounded from "@/app/ui/pantry/add-button-rounded";
import React, { useEffect } from "react";

export default function RenderDashboard({ user }: Readonly<{ user: User }>) {
  const { t } = useTranslation();

  const router = useRouter();

  // useEffect(() => {
  // if (!user.isFirstTimeUser) {
  // router.push("/dashboard/pantry");
  //}
  //}, [user, router]);
  useEffect(() => {
    setTimeout(() => {
      if (!user.isFirstTimeUser) router.push("/dashboard/pantry");
    }, 3000);
  }, [user, router]);
  return (
    <Box mt={"1rem"}>
      {user.isFirstTimeUser ? (
        <>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={"1rem"}
          >
            <Typography variant={"h5"} mb={"1rem"}>
              {t("text_welcome")}
            </Typography>
          </Box>
          <Typography variant={"h6"}>
            {t("text_welcome_user", { name: user?.firstName })}
          </Typography>
          <Typography variant={"h6"}>{t("text_welcome_message_1")}</Typography>
          <Typography variant={"h6"}>{t("text_welcome_message_2")}</Typography>
          <AddButtonRounded />
        </>
      ) : (
        <>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={"1rem"}
          >
            <Typography variant={"h5"} mb={"1rem"}>
              <Typography variant={"h6"}>
                {t("text_welcome_back", { name: user?.firstName })}
              </Typography>
              <Typography variant={"h6"}>
                {t("text_welcome_back_message")}
              </Typography>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
