'use client';
import {useFormState, useFormStatus} from "react-dom";
import {registerUser} from "@/app/lib/actions";
import React, {useState} from "react";
import {InputType} from "node:zlib";
import {ExclamationCircleIcon, EyeIcon, EyeSlashIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {auth} from "@/auth";
import {useSession} from "next-auth/react";
import {Box, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Fab from "@mui/material/Fab";
import theme from "@/theme";
import {FormControl} from "@mui/base";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignUpForm() {

// Store the token in a state
    const [errorMessage, dispatch] = useFormState(registerUser, undefined);
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisblePass = () => {
        setIsVisiblePass((prev) => !prev)
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box m={1}>

            <form action={dispatch} className={'flex flex-col'}>
                <div>
                    <TextField id="firstName"
                               label="First name"
                               variant="outlined"
                               required={true}
                               fullWidth={true}
                    />
                </div>
                <div>
                    <TextField id="lastName"
                               label="Last name"
                               variant="outlined"
                               required={true}
                               fullWidth={true}
                               sx={{marginTop: '1rem'}}/>
                </div>
                <div>
                    <TextField id="email"
                               label="Email"
                               variant="outlined"
                               required={true}
                               fullWidth={true}
                               sx={{marginTop: '1rem'}}/>

                </div>
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={isVisiblePass ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleVisblePass}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {isVisiblePass ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        fullWidth={true}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="confirm-password"
                        type={isVisiblePass ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleVisblePass}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {isVisiblePass ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm password"
                        fullWidth={true}
                    />
                </FormControl>

            </form>
            <SignupButton/>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                        {/*<p className="text-sm text-red-500">{errorMessage}</p>*/}
                    </>
                )}
            </div>
        </Box>
    );
}

function SignupButton() {
    const {pending} = useFormStatus();

    return (
        <Fab variant={'extended'} color={'primary'} sx={{marginTop: '1rem'}}
             aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Fab>
    );
}