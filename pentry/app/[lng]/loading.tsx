import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'flex-start'} height={'100vh'} mt={'5%'}>
            <CircularProgress color={'primary'}/>
        </Box>
    );
}