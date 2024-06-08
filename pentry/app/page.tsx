'use client';
import {Box, Link, Typography} from "@mui/material";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import theme from "@/theme";

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
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: 700,
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
