'use client';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Categories from "@/app/ui/search/categories";

export default function SearchBar({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        //params.set('page', '1');

        //const params = new URLSearchParams(searchParams);
        setSearchQuery(term)
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        //replace(`${pathname}?${params.toString()}`);
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
            <Fab variant="extended" color="primary" sx={{width: '100%', mt: '1rem'}}
                 onClick={() => {
                     handleClick();
                 }}>Find
            </Fab>
        </Box>
    )
}