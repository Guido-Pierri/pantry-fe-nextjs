import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress
                color={'primary'}/>
        </Box>
    );
}