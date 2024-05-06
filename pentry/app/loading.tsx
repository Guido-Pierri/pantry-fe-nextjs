import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {log} from "node:util";

export default function Loading() {
    return (

        <CircularProgress sx={{display: 'flex', justifyItems: 'center', alignItems: 'center', marginTop: '50%'}}
                          color={'primary'}/>
    );
}