/*
'use client';

import {HomeIcon, MagnifyingGlassIcon, RectangleStackIcon} from '@heroicons/react/24/outline';
import Link from '@mui/material/Link';
import {usePathname} from 'next/navigation';


export default function NavLinks({roles}: { roles: string }) {
    const pathname = usePathname();
// Map of links to display in the side navigation.
    const links = [
        {
            name: 'Home',
            href: '/dashboard',
            icon: HomeIcon
        },
        {
            name: 'Pantry',
            href: '/dashboard/pantry',
            icon: RectangleStackIcon,
        },
        /!*{
            name: 'Profile',
            href: '/dashboard/profile-page',
            icon: UserCircleIcon,
            roles: 'USER',
        },
        {
            name: 'Admin Page',
            href: '/dashboard/admin-page',
            icon: ClipboardIcon,
            roles: 'ADMIN',
        },*!/
        {
            name: 'Search',
            href: '/dashboard/search',
            icon: MagnifyingGlassIcon,
            roles: 'USER',
        }
        /!*
        {
            name: 'Add',
            href: '/dashboard/add-item',
            icon: PlusIcon
        },*!/
        /!*{
            name: 'Recipes',
            href: '/dashboard/recipes',
            icon: ClipboardIcon
        },*!/
    ];
    return (
        <>
            {links.map((link) => {
                if (link.roles && link.roles !== roles) {
                    return null;
                }
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        underline={'none'}
                        color={'inherit'}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            borderRadius: '1rem',
                            bgcolor: 'grey.50',
                            p: 3,
                            typography: 'body1',
                            '&:hover': {
                                bgcolor: 'sky.100',
                                color: 'blue.600',
                            },

                        }}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}*/
'use client';
import {Tab, Tabs} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import React from "react";
import {Logout} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import Box from "@mui/material/Box";
import RenderDashboard from "@/app/ui/dashboard/RenderDashboard";
import {PantryDto, User} from "@/app/lib/definitions";
import RenderPantry from "@/app/ui/pantry/RenderPantry";
import ResultsDialog from "@/app/ui/search/results-dialog";
import {Session} from "next-auth";

export default function NavLinks({user, pantry, searchParams, session}: {
    user: User, pantry: PantryDto, searchParams?: {
        query?: string;
        page?: string;
    }, session: Session
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-evenly'}} width={'100%'}>
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                    <Tab label={'Home'} icon={<HomeIcon/>} aria-label="phone" sx={{paddingLeft: '1rem'}}/>
                    <Tab label={'My Pantry'} icon={<FavoriteIcon/>} aria-label="favorite" sx={{paddingLeft: '1rem'}}/>
                    <Tab label={'Search'} icon={<PersonPinIcon/>} aria-label="person" sx={{paddingLeft: '1rem'}}/>
                    <Tab label={'Log out'} icon={<Logout/>} aria-label="logout" sx={{paddingLeft: '1rem'}}/>
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel value={value}
                                index={0}
                                children={<RenderDashboard user={user}/>}/>
                <CustomTabPanel value={value}
                                index={1}
                                children={<RenderPantry pantry={pantry}
                                                        userFromDatabase={user}/>}/>

                <CustomTabPanel value={value} index={2}
                                children={<ResultsDialog searchParams={searchParams} session={session}/>}/>
                <CustomTabPanel value={value} index={3}/>
            </Box>
        </Box>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}