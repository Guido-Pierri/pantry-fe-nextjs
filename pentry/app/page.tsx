'use client';
import {croissant} from "@/app/ui/fonts";
import {Box, Link, Typography} from "@mui/material";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);
    }, [router]);
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 24
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Link href="/dashboard" sx={{
                    typography: 'h2',
                    color: 'primary.main',
                    fontFamily: croissant.style.fontFamily,
                    mt: 8,
                    textAlign: 'center',
                    textDecoration: 'none',
                }}>
                    Pantry Partner
                </Link>
                <Typography sx={{mt: 4, textAlign: 'center'}}>
                    Manage groceries and minimize food waste
                </Typography>
            </Box>
        </Box>
    )
}
