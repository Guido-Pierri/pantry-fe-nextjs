import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "@/app/ui/logo";
import Box from "@mui/material/Box";
import theme from "@/theme";
import {Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {signOut} from "next-auth/react";
import React, {useState} from "react";

export default function NavbarLoggedIn() {
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
        <AppBar position="static" sx={{borderRadius: '1rem'}}>
            <Toolbar variant="dense"
                     sx={{
                         justifyContent: 'space-around',
                         display: 'flex',
                         flexDirection: 'column',
                     }}>
                <Logo/>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}
                     alignItems={'center'} width={'full'} sx={{backgroundColor: theme.palette.primary.main}}>
                    <Link href="/dashboard/pantry" underline={"hover"}>
                        <Typography variant="h6" color={'white'} component="div" padding={1} sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>
                            Home
                        </Typography>
                    </Link>
                    <Link href="/dashboard/recipes" underline={"hover"}>
                        <Typography variant="h6" color={'white'} component="div" padding={1} sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>
                            Recipes
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
                            <Link href={'/dashboard/profile-page'} color={'#000'}>
                                <MenuItem color={'MuiMenuItem'} onClick={handleClose} sx={{
                                    '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline'// Change this to the color you want on hover
                                    },
                                }}>Profile</MenuItem>
                            </Link>
                            <MenuItem onClick={() => {
                                signOut();
                            }}
                                      sx={{
                                          '&:hover': {
                                              color: 'primary.main', // Change this to the color you want on hover
                                              textDecoration: 'underline'
                                          },
                                      }}
                            >Sign Out
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}