'use client';
import {fetchUserById} from "@/app/lib/data";
import Link from "next/link";
import {updateUserProfile} from "@/app/lib/actions";
import {Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {AccountCircle, Email, Visibility, VisibilityOff} from "@mui/icons-material";
import {FormControl} from "@mui/base";
import React, {useState} from "react";
import {User} from "@/app/lib/definitions";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersTable({user}: { user: User }) {

    if (!user) return null;
    const updateUserWithId = updateUserProfile.bind(null, user?.id);
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisblePass = () => {
        setIsVisiblePass((prev) => !prev)
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (

        <Box
            component="form" action={updateUserWithId} flexDirection={'column'}
            sx={{alignItems: 'flex-start'}}
            m={'1rem'}>
            <Box sx={{borderRadius: '1%'}} p={1}>
                <TextField
                    sx={{marginBottom: '1rem'}}
                    fullWidth={true}

                    id="firstName"
                    name="firstName"
                    label="first name"
                    defaultValue={user?.firstName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    required={true}
                />
                <TextField
                    sx={{marginBottom: '1rem'}}
                    fullWidth={true}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    defaultValue={user?.lastName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    required={true}
                />
                <TextField
                    sx={{marginBottom: '1rem'}}
                    fullWidth={true}
                    type={'email'}
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={user?.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    required={true}
                />
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name={'password'}
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
                        //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required={true}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        name={'confirmPassword'}
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
                        //value={confirmPassword}
                        //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        required={true}
                    />
                </FormControl>
            </Box>
            <Button endIcon={<DeleteIcon/>} color={'secondary'} href={'/dashboard/profile-page/delete-account'}>
                Delete your account
            </Button>

            <Box display={'flex'} justifyContent={'end'} mt={4}>
                <Fab type="submit" variant={'extended'} color={'primary'}>Submit changes</Fab>

            </Box>
        </Box>
    );
}