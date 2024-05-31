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
import {Session} from "next-auth";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function NavbarLoggedIn({session}: { session: Session | null }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    if (!session) return null;
    console.log('session in navbar', session)
    const user = session.user;
    if (!user) return null;
    //console.log('user in navbar', user)
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
                     sx={{
                         justifyContent: 'space-around',
                         display: 'flex',
                         flexDirection: 'column',
                     }}>
                <Logo/>
            </Toolbar>
            <Toolbar variant="dense" sx={{
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}
                     alignItems={'center'} width={'full'}>
                    <Link href="/dashboard/pantry" underline={"hover"}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'.5rem'}>
                            <HomeRoundedIcon/>
                            <Typography color={'primary'} component="div" sx={{
                                '&:hover': {
                                    textDecoration: 'underline', // Change this to the color you want on hover
                                },
                            }}>
                                Pantry
                            </Typography>
                        </Box>
                    </Link>
                    <Link href="/dashboard/recipes" underline={"hover"}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'.5rem'}>
                            <ListAltRoundedIcon/>
                            <Typography color={'primary'}
                                        component="div"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline', // Change this to the color you want on hover
                                            },
                                        }}>
                                Recipes
                            </Typography>
                        </Box>
                    </Link>
                    <Link href="/dashboard/search" underline={"hover"}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'.5rem'}>
                            <SearchRoundedIcon/>
                            <Typography color={'primary'} component="div" sx={{
                                '&:hover': {
                                    textDecoration: 'underline', // Change this to the color you want on hover
                                },
                            }}>
                                Search
                            </Typography>
                        </Box>
                    </Link>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={'.5rem'}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color={'primary'}
                            sx={{padding: '0'}}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Typography color={'primary'} component="div" sx={{
                            '&:hover': {
                                textDecoration: 'underline', // Change this to the color you want on hover
                            },
                        }}>Account</Typography>
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
                            onClose={handleClose}>
                            {user?.roles == 'ADMIN' ?
                                <Link href={'/dashboard/admin-page'} color={'primary'} underline={'none'}>
                                    <MenuItem color={'primary'} onClick={handleClose} sx={{
                                        '&:hover': {
                                            color: 'primary.main',
                                            textDecoration: 'underline'// Change this to the color you want on hover
                                        },
                                    }}>Admin Page</MenuItem>
                                    <Link href={'/dashboard/profile-page'} color={'primary'}
                                          underline={'none'}><MenuItem
                                        color={'MuiMenuItem'}
                                        onClick={handleClose}
                                        sx={{
                                            '&:hover': {
                                                color: 'primary.main',
                                                textDecoration: 'underline'// Change this to the color you want on hover
                                            },
                                        }}>

                                        Profile</MenuItem>
                                    </Link>
                                </Link> :
                                <Link href={'/dashboard/profile-page'} color={'primary'} underline={'none'}>
                                    <MenuItem color={'primary'} onClick={handleClose} sx={{
                                        '&:hover': {
                                            color: 'primary.main',
                                            textDecoration: 'underline'// Change this to the color you want on hover
                                        },
                                    }}>Profile</MenuItem>
                                </Link>
                            }
                            <MenuItem onClick={() => {
                                signOut();
                            }}
                                      color={'primary'}
                                      sx={{
                                          color: 'primary.main',
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