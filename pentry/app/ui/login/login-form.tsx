"use client";
import Button from "@mui/material/Button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Box component={"form"} action={dispatch}>
      <Box padding={"1.5rem"}>
        <Typography variant={"h5"}>Please log in to continue.</Typography>
        <Box mt={"1.5rem"}>
          <TextField
            id={"email"}
            type={"email"}
            name={"email"}
            placeholder={"Enter your email address"}
            required={true}
            fullWidth={true}
          ></TextField>
          <TextField
            sx={{ marginTop: "1rem" }}
            id={"password"}
            type={"password"}
            name={"password"}
            placeholder={"Enter your password"}
            required={true}
            fullWidth={true}
          ></TextField>
        </Box>
        <LoginButton />

        <Box aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <ReportGmailerrorredIcon color={"error"} />
              <Typography color={"error"}>{errorMessage}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"2rem"}
    >
      <Button
        variant={"contained"}
        type={"submit"}
        aria-disabled={pending}
        sx={{ width: "240px", height: "50px" }}
      >
        Sign in with credentials
      </Button>
    </Box>
  );
}
