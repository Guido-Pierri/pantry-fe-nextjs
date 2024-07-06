"use client";
import { Typography } from "@mui/material";
import i18n from "@/i18n";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function LoginText() {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      mt={"1rem"}
      alignItems={"center"}
    >
      <Typography>{i18n.t("text_dont_have_account")}</Typography>
      <Button size={"small"} href={"/signup"} color={"primary"}>
        {i18n.t("text_signup")}{" "}
      </Button>
    </Box>
  );
}
