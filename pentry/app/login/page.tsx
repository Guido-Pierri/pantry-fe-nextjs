import LoginForm from "@/app/ui/login/login-form";
import { SignIn } from "@/app/ui/auth/auth-components";
import { auth } from "@/auth";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Navbar from "@/app/ui/navbar/navbar";

export default async function LoginPage() {
  const session = await auth();

  if (!session?.user)
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Navbar session={session}></Navbar>
        </Box>

        <LoginForm />
        <Typography textAlign={"center"}>Or</Typography>
        <SignIn provider={"google"}></SignIn>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          mt={"1rem"}
          alignItems={"center"}
        >
          <Typography>Don&apos;t have an account?</Typography>
          <Button size={"small"} href={"/signup"} color={"primary"}>
            Sign up
          </Button>
        </Box>
      </Box>
    );
}
