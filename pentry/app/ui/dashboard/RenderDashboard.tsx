'use client';
import {Box, Typography} from "@mui/material";
import {User} from "@/app/lib/definitions";

export default function RenderDashboard({user}: Readonly<{ user: User }>) {
    console.log('user', user)
    return (
        <Box mt={'1rem'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'1rem'}>
                <Typography variant={'h5'} mb={'1rem'}>Welcome to Pantry Partner!</Typography>
            </Box>
            <Typography variant={'h6'}>We’re thrilled to have you here {user.firstName}. Our
                application is designed to make managing your pantry easier and more efficient.</Typography>
            <Typography variant={'h6'}>Whether you’re looking
                to keep track of your inventory, find new recipes, or reduce food waste, Pantry Partner is here to
                help.</Typography>
            <Typography variant={'h6'}>
                Explore the features, and let us assist you in organizing and optimizing your pantry like never before.
            </Typography>
            <Typography variant={'h6'}>Happy cooking and organizing!
            </Typography>
            <Typography variant={'h6'}>Best regards,</Typography>
            <Typography variant={'h6'}>The Pantry Partner Team</Typography>
        </Box>
    );
}