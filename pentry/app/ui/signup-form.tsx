'use client';
import {useFormStatus} from "react-dom";
import {registerUser} from "@/app/lib/actions";
import React, {useState} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {Box, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import {FormControl} from "@mui/base";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {croissant} from "@/app/ui/fonts";


export default function SignUpForm() {

    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisblePass = () => {
        setIsVisiblePass((prev) => !prev)
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        const formAction = registerUser.bind(null, formData);
        formAction().then((response) => {
            if (response) setErrorMessage(response)
        });
    };

    return (

        <Box
            component="form" onSubmit={handleSubmit} flexDirection={'column'} sx={{alignItems: 'flex-start'}}
            m={'1rem'}>
            <div
                className={`${croissant.className} text-3xl text-white mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40`}
            >Pantry Partner

            </div>
            <Typography variant={'h5'}>Sign up to Pantry partner</Typography>
            <div>
                <TextField id="firstName"
                           label="First name"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           sx={{marginTop: '1rem'}}
                           value={firstName}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}

                />
            </div>
            <div>
                <TextField id="lastName"
                           label="Last name"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           sx={{marginTop: '1rem'}}
                           value={lastName}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}

                />
            </div>
            <div>
                <TextField id="email"
                           label="Email"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           sx={{marginTop: '1rem'}}
                           value={email}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}

                />
            </div>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
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
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required={true}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                    id="confirmPassword"
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
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    required={true}
                />
            </FormControl>
            <SignupButton/>

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </Box>
    );
}

function SignupButton() {
    const {pending} = useFormStatus();
    return (
        <Fab variant={'extended'} color={'primary'} sx={{marginTop: '1rem', minWidth: 'fit-content'}} type={'submit'}
             aria-disabled={pending}>
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Fab>
    );
}