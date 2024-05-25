import {Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {croissant} from "@/app/ui/fonts";
import Box from "@mui/material/Box";
import React from "react";

export default function Logo() {
    return (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}
             alignItems={'center'}
             sx={{
                 width: '100%',
                 borderRadius: "1rem",
                 margin: '1rem',
                 backgroundColor: 'primary.main',
             }}
        >
            <Link href="/dashboard">
                <Typography fontSize={38} color={'white'} fontFamily={croissant.style.fontFamily}>
                    Pantry Partner
                </Typography>
            </Link>
        </Box>
    );
}