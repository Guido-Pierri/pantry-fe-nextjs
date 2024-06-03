import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {
    Avatar,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    Tooltip
} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, {useState} from "react";
import {Session} from "next-auth";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import pp_logo_transparent from "@/app/images/pp_logo_transparent2.png";
import Image from "next/image";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {CircleNotifications} from "@mui/icons-material";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavbarLoggedIn({session}: { session: Session | null }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (!session) return null;
    console.log('session in navbar', session)
    const user = session.user;
    if (!user) return null;
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
    const drawerWidth = 240;
    const navItems = ['Pantry', 'Search'];
    const handleDrawerToggle = () => {
        setMobileOpen((prevState: any) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Pantry Partner </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // @ts-ignore
    return (
        /*<AppBar position="static">
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
        </AppBar>*/
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Image src={pp_logo_transparent} alt={'Pantry Partner logotype'} height={50}
                           width={50}
                           style={{display: isSmallScreen ? 'flex' : 'none'}}/>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Pantry Partner
                    </Typography>
                    {/*
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
*/}
                    {/*<Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>*/}
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                        <Image src={pp_logo_transparent} alt={'Pantry partner logo'} width={50} height={50}
                               style={{display: !isSmallScreen ? 'flex' : 'none'}}/>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}}}
                        >
                            Pantry Partner
                        </Typography>
                    </Box>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{color: '#fff'}}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <CircleNotifications sx={{display: {xs: 'flex', sm: 'block'}}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src={session.user.imageUrl}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>

            </Box>
        </Box>
    )
}