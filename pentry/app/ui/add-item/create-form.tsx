'use client'
import {useFormState} from "react-dom";
import {saveCustomItem} from "@/app/lib/actions";
import Link from "next/link";
import Button from "@mui/material/Button";
import React from "react";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Fab from "@mui/material/Fab";

export default async function CreateForm({categories}: { categories: string[] | undefined }) {

    const [errorMessage, dispatch] = useFormState(saveCustomItem, undefined);
    return <Box component="form" action={dispatch}>
        <Box /*className={'flex flex-col mt-6'}>*/ flexDirection={'column'} border={"black"}>
            <Typography variant={'h6'}>
                Add a custom item to your pantry
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
                {categories?.map((option) => (
                    <MenuItem key={option?.indexOf(option)} value={option}>
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
        <Box display={"flex"} justifyContent={'end'} /*className="mt-6 flex justify-end gap-4"*/>

            <Fab variant={'extended'} color={'primary'} type="submit">Save Item</Fab>
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