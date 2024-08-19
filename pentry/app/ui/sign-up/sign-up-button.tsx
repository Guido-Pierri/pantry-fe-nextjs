"use client";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SignupButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  console.log("pending", pending);
  return (
    <Button
      variant={"contained"}
      color={"primary"}
      fullWidth={true}
      sx={{ marginTop: "1rem", minWidth: "fit-content" }}
      type={"submit"}
      aria-disabled={pending}
    >
      {t("text_button_sign_up")}{" "}
      <ArrowForwardIcon sx={{ marginLeft: "1rem" }} />
    </Button>
  );
}
