import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {
    Avatar,
    CssBaseline,
    Divider,
    Drawer,
    Link,
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
import {signOut} from "next-auth/react";

export default function NavbarLoggedIn({session}: { session: Session | null }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    const handleClose = () => {
        setAnchorEl(null);
    };
    const drawerWidth = 240;
    const navItems = [{name: 'Pantry', url: '/dashboard/pantry'}, {
        name: 'Recipes',
        url: '/dashboard/recipes'

    }, {name: 'Search', url: '/dashboard/search'}];
    const handleDrawerToggle = () => {
        setMobileOpen((prevState: any) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center',}}>
            <Typography variant="h6" color={theme.palette.primary.main} sx={{my: 2}}>
                Pantry Partner </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} href={item.url}>
                            <ListItemText sx={{color: theme.palette.primary.main}} primary={item.name}/>
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
    return (
        <Box sx={{display: 'flex', backgroundColor: 'primary.main'}}>
            <CssBaseline/>
            <AppBar component="nav" sx={{backgroundColor: 'primary.main'}}>
                <Toolbar sx={{justifyContent: 'space-between', backgroundColor: 'primary.main'}}>
                    <Box id={'hamburgerLogoBox'} display={'flex'} flexDirection={'row'}>

                        <Box id={'hamburgerBox'}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'none'}}}

                            >
                                <MenuIcon fontSize={'large'}/>
                            </IconButton>
                        </Box>
                        <Box id={'logoBox'} display={'flex'} flexDirection={'row'} justifyContent={'center'}
                             alignItems={'center'}>
                            <Image
                                src={pp_logo_transparent}
                                alt={'Pantry Partner logo'}
                                width={40}
                                height={40}
                                style={{
                                    display: 'flex',
                                    position: !isSmallScreen ? 'absolute' : 'relative',
                                    left: !isSmallScreen ? '50%' : '0',
                                    transform: !isSmallScreen ? 'translateX(-50%)' : 'none',
                                }}
                            />
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    display: {xs: isSmallScreen ? 'flex' : 'none', sm: 'block'},
                                    marginLeft: '1rem', fontWeight: 700,


                                }}
                            >
                                Pantry Partner
                            </Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}>

                        <Box sx={{display: {xs: 'none', sm: 'block'}}} marginRight={'1rem'}>
                            {navItems.map((item) => (
                                <Button key={item.name} sx={{color: '#fff'}} href={item.url}>
                                    {item.name}
                                </Button>
                            ))}
                        </Box>
                        {/* FIXME: Add notifications feature */}
                        {/*<MenuItem>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <CircleNotifications sx={{display: {xs: 'flex', sm: 'block'}}}/>
                            </Badge>
                        </IconButton>
                    </MenuItem>*/}

                        <Box sx={{flexGrow: 0}} marginLeft={'1rem'}>
                            <Tooltip title="Open settings">
                                <IconButton size={'small'} onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Profile picture" src={session.user.imageUrl}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
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
                                onClose={handleCloseUserMenu}>
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
                            {/*<Menu
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
                        </Menu>*/}
                        </Box>
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
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )
}