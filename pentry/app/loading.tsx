import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {log} from "node:util";

export default function Loading({marginTopProp}: { marginTopProp?: string }) {
    console.log('marginTopProp', marginTopProp)
    return (

        <CircularProgress sx={{display: 'flex', justifyItems: 'center', alignItems: 'center', marginTop: marginTopProp}}
                          color={'primary'}/>
    );
}