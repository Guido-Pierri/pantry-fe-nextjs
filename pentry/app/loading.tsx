import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <Box sx={{display: 'flex', marginTop: '50%', marginLeft: '45%'}}>
            <CircularProgress sx={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}
                              color={'primary'}/>
        </Box>
    );
}