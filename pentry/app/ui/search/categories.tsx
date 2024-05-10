'use client';
import {Box, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import {useState} from "react";

export default function Categories() {
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        !visible ? setVisible(true) : setVisible(false)
    }

    return (
        <>
            <Typography variant={'h6'} mt={'2rem'} sx={{cursor: 'pointer'}}
                        onClick={handleClick}>Click to
                search by category</Typography>
            {visible ?
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Fruit</Fab>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Vegetables</Fab>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Dairy</Fab>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Meat</Fab>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Grains</Fab>
                    <Fab variant="extended" color="primary" size={"small"}
                         sx={{width: '30%', marginTop: '1rem'}}>Spices</Fab>
                </Box> : null}
        </>
    )
}