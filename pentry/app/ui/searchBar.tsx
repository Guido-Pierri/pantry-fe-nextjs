'use client';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Categories from "@/app/ui/search/categories";
import {useContext} from 'react';
import {OpenDialogContext} from './search/open-dialog-context';


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
        <Box component="form" display={'flex'} flexDirection={'column'}>
            <TextField
                id="input-with-icon-textfield"
                variant={'outlined'}
                sx={{width: '100%'}}
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
            <Categories/>
            <Fab variant="extended" color={'primary'}
                 sx={{
                     width: '100%',
                     mt: '1rem',
                 }}
                 onClick={() => {
                     handleClick();
                 }}>Find
            </Fab>
        </Box>
    )
}