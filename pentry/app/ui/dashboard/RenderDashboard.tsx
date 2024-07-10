"use client";
import { Box, Typography } from "@mui/material";
import { User } from "@/app/lib/definitions";
import { useTranslation } from "react-i18next";

export default function RenderDashboard({ user }: Readonly<{ user: User }>) {
  const { t } = useTranslation();
  return (
    <Box mt={"1rem"}>
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
      <Typography variant={"h6"}>
        Whether you’re looking to keep track of your inventory, find new
        recipes, or reduce food waste, Pantry Partner is here to help.
      </Typography>
      <Typography variant={"h6"}>
        Explore the features, and let us assist you in organizing and optimizing
        your pantry like never before.
      </Typography>
      <Typography variant={"h6"}>Happy cooking and organizing!</Typography>
      <Typography variant={"h6"}>Best regards,</Typography>
      <Typography variant={"h6"}>The Pantry Partner Team</Typography>
    </Box>
  );
}
