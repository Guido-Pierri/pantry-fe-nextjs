import LoginForm from "@/app/ui/login-form";
import {SignIn} from "@/app/ui/auth/auth-components";
import {auth} from "@/auth";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

export default async function LoginPage() {
    const session = await auth()

    if (!session?.user) return (
        <Box sx={{
            width: '100%', // default to full width
            '@media (min-width:600px)': {
                width: '600px',
            },
        }}>
            <LoginForm/>
            <Typography textAlign={'center'}>Or sign in with</Typography>
            <SignIn provider={'google'}></SignIn>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mt={'1rem'}
                 alignItems={'center'}>

                <Typography>Don&apos;t have an account?</Typography>
                <Button size={"small"} href={'/signup'} color={'primary'}>Sign up</Button>
            </Box>
        </Box>
    );
}
