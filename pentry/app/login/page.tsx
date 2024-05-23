import {croissant} from "@/app/ui/fonts";
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
            <Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}
                     sx={{
                         borderRadius: "1rem",
                         padding: 3,
                         margin: '1rem',
                         backgroundColor: 'primary.main',
                     }}>
                    <Typography fontSize={32} color={'white'}
                                fontFamily={croissant.style.fontFamily}>
                        Pantry Partner
                    </Typography>
                </Box>
                <LoginForm/>
            </Box>
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
