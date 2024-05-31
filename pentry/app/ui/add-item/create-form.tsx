'use client'
import {useFormState} from "react-dom";
import {saveCustomItem} from "@/app/lib/actions";
import React from "react";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Fab from "@mui/material/Fab";

export default function CreateForm({categories}: { categories: string[] }) {

    const [errorMessage, dispatch] = useFormState(saveCustomItem, undefined);
    const [optionCategories, setOptionCategories] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (categories) {
            setOptionCategories(categories)
        }
    }, [categories]);
    return <Box component="form" action={dispatch}>
        <Box flexDirection={'column'} border={"black"}>
            <Typography variant={'h6'}>
                Save an item to your pantry
            </Typography>
            <TextField id={"name"}
                       name={"name"}
                       label={"Enter name"}
                       type={"text"}
                       placeholder={'Item'}
                       required={true}
                       fullWidth={true}
                       margin={"normal"}/>
            <TextField id={"category"}
                       select
                       name={"category"}
                       label={"Select a category"}
                       placeholder={'Category'}
                       required={true}
                       fullWidth={true}
                       margin={"normal"}>
                {optionCategories && optionCategories?.map((option) => (
                    <MenuItem key={option && option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id={"expirationDate"}
                       name={"expirationDate"}
                       type={"date"}
                       required={true}
                       fullWidth={true}
                       margin={"normal"}/>

        </Box>
        <Box display={"flex"} justifyContent={'space-evenly'}>
            <Fab variant={'extended'} color={'primary'} type="submit" size={'small'} sx={{padding: '.5rem'}}>Save
                Item</Fab>
            <Fab href={'/dashboard/pantry'} variant={'extended'} color={'primary'} size={'small'}
                 sx={{padding: '.5rem'}}>Cancel</Fab>
        </Box>

        <div
            className="flex h-8 items-end space-x-1"

        >
            {errorMessage ? <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{errorMessage}</p>
            </> : null}
        </div>
    </Box>
}