'use client';
import {croissant, inter} from '@/app/ui/fonts';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    // status: {
    //     danger: 'orange',
    // },
    typography: {
        fontFamily: [
            inter.style.fontFamily,
            croissant.style.fontFamily,
        ].join(','),
    },
    palette: {
        mode: 'light',
        background: {
            default: '#f8f8f8',
        },
        primary: {
            light: 'rgb(224 242 254)',
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
