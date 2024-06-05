'use client';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";
import {useContext, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {OpenDialogContext} from './open-dialog-context';


export default function SearchBar({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const {setOpen} = useContext(OpenDialogContext);

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        setSearchQuery(term)
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

    }, 300);


    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '0');
        console.log('pathname in click', pathname)
        console.log('searchQuery in click', searchQuery)
        console.log('params in click', params)
        if (searchQuery) {
            params.set('query', searchQuery);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
        if (setOpen) {
            setOpen(true);
        }


    }
    return (
        <Box component="form" display={'flex'} flexDirection={'column'} id={'searchBar box'}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'baseline'}>
                <TextField

                    id="input-with-icon-textfield"
                    variant="outlined"
                    sx={{
                        backgroundColor: 'background.default',
                        borderColor: 'primary.light',
                        color: 'text.primary',
                        marginRight: 1,
                    }}
                    type="search"
                    fullWidth={true}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Fab variant="extended" color={'primary'}
                     sx={{
                         mt: '1rem',
                         ml: '1rem',
                         width: '6rem',
                     }}
                     onClick={() => {
                         handleClick();
                     }}>Find
                </Fab>
            </Box>
        </Box>
    )
}