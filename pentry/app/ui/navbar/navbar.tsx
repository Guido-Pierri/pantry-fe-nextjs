// FileName - Navbar.js

// Importing files from Material-UI
'use client';
import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {croissant} from "@/app/ui/fonts";
import {Link} from "@mui/material";
import theme from "@/theme";
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import {signOut} from "next-auth/react"

// Using Inline Styling

// Exporting Default Navbar to the App.js File
export default function Navbar() {
    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };*/
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
            <Toolbar variant="dense"
                     sx={{justifyContent: 'space-around', display: 'flex', flexDirection: 'column'}}>
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
                        <Typography fontSize={32} color={'white'} fontFamily={croissant.style.fontFamily}>
                            Pantry Partner
                        </Typography>
                    </Link>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}
                     alignItems={'center'} width={'full'} sx={{backgroundColor: theme.palette.primary.main}}>
                    <Link href="/dashboard" underline={"hover"}>
                        <Typography variant="h6" color={'white'} component="div" padding={1} sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>
                            Home
                        </Typography>
                    </Link>
                    <Link href="/dashboard/pantry" underline={"hover"}>
                        <Typography variant="h6" color={'white'} component="div" padding={1} sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>
                            My Pantry
                        </Typography>
                    </Link>
                    <Link href="/dashboard/search" underline={"hover"}>
                        <Typography variant="h6" color={'white'} component="div" padding={1} sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>
                            Search
                        </Typography>
                    </Link>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color={'inherit'}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Link href={'/dashboard/profile-page'} underline={'hover'}>
                                <MenuItem color={'MuiMenuItem'} onClick={handleClose}>Profile</MenuItem>
                            </Link>
                            <MenuItem onClick={handleClose}>
                                <Typography sx={{
                                    '&:hover': {
                                        color: 'primary.main', // Change this to the color you want on hover
                                        textDecoration: 'underline'
                                    },
                                }} onClick={() => {
                                    signOut();
                                }}
                                >Sign Out
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
