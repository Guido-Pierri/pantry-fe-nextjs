import { signIn, signOut } from "@/auth";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import RenderGoogleButton from "@/app/ui/login/google-button";

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
      <Box component={"button"} type={"submit"}>
        <RenderGoogleButton />
      </Box>
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
