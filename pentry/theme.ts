'use client';
import {Roboto, Lusitana} from 'next/font/google';
import {inter, lusitana} from '@/app/ui/fonts';

import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});


const theme = createTheme({
    // status: {
    //     danger: 'orange',
    // },

    typography: {
        fontFamily: inter.style.fontFamily,

    },
    palette: {
        mode: 'light',
        background: {
            default: '#f8f8f8',
        },
        primary: {
            light: 'rgba(29,118,254,0.3)',
            main: '#1d76fe',
            dark: '#2c41cc',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgba(255,97,121,0.2)',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export default theme;
