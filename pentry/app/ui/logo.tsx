import {Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import theme from "@/theme";

export default function Logo() {
    return (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}
             alignItems={'center'}
             sx={{
                 width: '100%',
                 borderRadius: "1rem",
                 margin: '1rem 0 1rem 0',
                 backgroundColor: 'primary.main',
             }}
        >
            <Link href="/dashboard">
                <Typography fontSize={38} fontWeight={600} color={'white'} fontFamily={theme.typography.fontFamily}>
                    Pantry Partner
                </Typography>
            </Link>
        </Box>
    );
}