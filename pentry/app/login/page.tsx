import {croissant} from "@/app/ui/fonts";
import LoginForm from "@/app/ui/login-form";
import {SignIn} from "@/app/ui/auth/auth-components";
import {auth} from "@/auth";
import Link from "next/link";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import theme from "@/theme";
import {blue} from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

export default async function LoginPage() {
    const session = await auth()
    if (!session?.user) return (
        <Box /*className="flex items-center justify-center md:h-screen"*/>
            <Box /*className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32"*/>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}
                     sx={{
                         borderRadius: "1rem",
                         padding: 3,
                         margin: '1rem',
                         backgroundColor: 'primary.main',
                     }} /*className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36"*/>
                    <Typography fontSize={32} color={'white'}
                                fontFamily={croissant.style.fontFamily}/*w-32 text-white md:w-36`*/>
                        Pantry Partner
                    </Typography>
                </Box>
                <LoginForm/>
            </Box>
            <SignIn provider={'google'}></SignIn>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mt={'1rem'}
                 alignItems={'center'}>

                <Typography>Don&apos;t have an account?</Typography>
                <Button size={"small"} href={'/signup'} color={'primary'}>Sign up</Button>
            </Box>
        </Box>
    );
}
