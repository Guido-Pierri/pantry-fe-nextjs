'use client';
import {Box, Typography} from "@mui/material";
import {User} from "@/app/lib/definitions";

export default function RenderDashboard({user}: { user: User }) {
    console.log('user', user)
    return (
        <Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Typography variant={'h5'} mb={'1rem'}>Welcome to Pantry Partner!</Typography>
            </Box>
            <Typography variant={'h6'}>We’re thrilled to have you here. Our
                application is designed to make managing your pantry easier and more efficient. Whether you’re looking
                to keep track of your inventory, find new recipes, or reduce food waste, Pantry Partner is here to
                help.</Typography>
            <Typography variant={'h6'}>
                Explore the features, and let us assist you in organizing and optimizing your pantry like never before.
                If you have any questions or need assistance, our support team is just a click away.
            </Typography>
            <Typography variant={'h6'}>Happy cooking and organizing!
            </Typography>
            <Typography variant={'h6'}>Best regards,</Typography>
            <Typography variant={'h6'}>The Pantry Partner Team</Typography>
        </Box>
    );
}