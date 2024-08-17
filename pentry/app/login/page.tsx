import LoginForm from "@/app/ui/login/login-form";
import { SignIn } from "@/app/ui/auth/auth-components";
import { auth } from "@/auth";
import Box from "@mui/material/Box";
import Navbar from "@/app/ui/navbar/navbar";
import LoginText from "@/app/ui/login/login-text";

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
        <SignIn provider={"google"}></SignIn>

        <LoginText />
      </Box>
    );
}
