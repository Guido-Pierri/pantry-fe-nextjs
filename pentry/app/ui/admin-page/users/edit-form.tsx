import {TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Link, Avatar} from '@mui/material';
import {User} from "@/app/lib/definitions";
import {updateUser} from "@/app/lib/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function EditUserForm({user}: { user: User | null; }) {
    if (!user) {
        return null;
    }
    console.log('user in edit form', user)
    const updateUserWithId = updateUser.bind(null, user?.id);
    return (
        <Box component={'form'} action={updateUserWithId}>
            <TextField
                id="firstName"
                name="firstName"
                label="Edit first name"
                defaultValue={user?.firstName}
                variant="outlined"
                fullWidth
                sx={{mb: '1rem'}}
            />
            <TextField
                id="lastName"
                name="lastName"
                label="Edit last name"
                defaultValue={user?.lastName}
                variant="outlined"
                fullWidth
                sx={{mb: '1rem'}}
            />
            <TextField
                id="email"
                name="email"
                label="Edit email"
                defaultValue={user?.email}
                variant="outlined"
                fullWidth
                sx={{mb: '1rem'}}
            />
            <FormControl component="fieldset" className="mb-4">
                <FormLabel component="legend">Set the user role</FormLabel>
                <RadioGroup
                    aria-label="roles"
                    name="roles"
                    defaultValue={user?.roles}
                >
                    <FormControlLabel value="USER" control={<Radio/>}
                                      label="USER"/>
                    <FormControlLabel value="ADMIN" control={<Radio/>} label="ADMIN"/>
                </RadioGroup>
            </FormControl>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/admin-page"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Submit</Button>
            </div>
        </Box>
    );
}
