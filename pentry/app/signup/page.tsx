import SignUpForm from "@/app/ui/sign-up/signup-form";
import { Box } from "@mui/material";
import React from "react";
import { auth } from "@/auth";
import Navbar from "@/app/ui/navbar/navbar";

export default async function SignupPage() {
  const session = await auth();
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: "100%",
        }}
      >
        <Navbar session={session}></Navbar>
        <SignUpForm></SignUpForm>
      </Box>
    </Box>
  );
}
