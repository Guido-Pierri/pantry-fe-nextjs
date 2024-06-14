'use client';
import {registerUser} from "@/app/lib/actions";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import {FormControl} from "@mui/base";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SignupButton from "@/app/ui/sign-up/sign-up-button";

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
            component="form" onSubmit={handleSubmit} flexDirection={'column'}
            m={'1rem'}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Button href={'/login'}>
                    <KeyboardBackspaceRoundedIcon/>
                </Button>
                <Typography variant={'h6'}>Sign up to Pantry partner</Typography>

            </Box>
            <FormControl>
                <InputLabel sx={{marginTop: '1rem'}} htmlFor="firstName">Enter First Name</InputLabel>
                <TextField id="firstName"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           placeholder={'First Name'}
                           value={firstName}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}

                />
            </FormControl>
            <FormControl>
                <InputLabel sx={{marginTop: '1rem'}} htmlFor="lastName">Enter Last Name</InputLabel>
                <TextField id="lastName"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           placeholder={'Last Name'}
                           value={lastName}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}

                />
            </FormControl>
            <FormControl>
                <InputLabel sx={{marginTop: '1rem'}}
                            htmlFor="password">Enter Email</InputLabel>
                <TextField id="email"
                           variant="outlined"
                           required={true}
                           fullWidth={true}
                           value={email}
                           placeholder={'Email'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}

                />
            </FormControl>
            <FormControl>
                <InputLabel sx={{marginTop: '1rem'}} htmlFor="password">Enter Password</InputLabel>

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
                    fullWidth={true}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required={true}
                />
            </FormControl>
            <FormControl>
                <InputLabel sx={{marginTop: '1rem'}} htmlFor="confirmPassword">Confirm Password</InputLabel>
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
                    fullWidth={true}
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    required={true}
                />
            </FormControl>
            <SignupButton/>

            <Box
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <Box display={'flex'} flexDirection={'row'} justifyContent={"center"}>
                        <ReportGmailerrorredIcon color={"error"}/>
                        <Typography color={'error'}>{errorMessage}</Typography>
                    </Box>)}
            </Box>
        </Box>
    );
}


