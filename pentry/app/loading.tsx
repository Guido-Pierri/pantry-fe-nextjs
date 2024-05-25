import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} mt={'10%'}>
            <CircularProgress color={'primary'}/>
        </Box>
    );
}