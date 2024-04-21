'use client';
import {Roboto, Lusitana} from 'next/font/google';
import {inter, lusitana} from '@/app/ui/fonts';

import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});
/*const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});*/
// declare module '@mui/material/styles' {
//     interface Theme {
//         status: {
//             danger: string;
//         };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         status?: {
//             danger?: string;
//         };
//     }
// }

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
            light: '#8dceff',
            main: '#1d76fe',
            dark: '#2c41cc',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export default theme;
