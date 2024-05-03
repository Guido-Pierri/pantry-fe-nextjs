import Link from "next/link";
import {Item, PantryDto} from "@/app/lib/definitions";
import {
    fetchPantryByUserId,
} from '@/app/lib/data';
import {auth} from "@/auth";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Image from "next/image";
import pantryPic from '@/app/images/shelving.png';
import {Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RenderPantry from "@/app/ui/pantry/RenderPantry";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const token = session?.token;
    const userEmail = session?.user?.email
    if (!token || !userEmail) return null
    const userFromDatabase = session?.dbUser
    const id = userFromDatabase?.id as string
    if (!id) return null
    const pantry = await fetchPantryByUserId(id)
    if (!pantry) return null

    //FIXME: Add delete functionality
    function deleteItem() {
        'use client'
        console.log('delete item')
    }

    return (
        <RenderPantry pantry={pantry} userFromDatabase={userFromDatabase}/>

    )
}



