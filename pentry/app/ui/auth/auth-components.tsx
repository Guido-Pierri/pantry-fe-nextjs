import { signIn, signOut } from "@/auth";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Image from "next/image";
import googleIcon from "@/app/images/web_neutral_rd_na.svg";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <Box
      component={"form"}
      m={"1.5rem"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button
        variant={"contained"}
        type={"submit"}
        color={"secondary"}
        sx={{
          width: { xs: "75vw" },
          backgroundColor: "#f2f2f2",
        }}
      >
        <Avatar>
          <Image src={googleIcon} alt={"Login in with Google"} />
        </Avatar>
        Sign in with Google
      </Button>
    </Box>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
