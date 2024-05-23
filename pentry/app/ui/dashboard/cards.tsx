'use client';
import {
    ClipboardDocumentListIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    RectangleStackIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import {CustomItem, Ingredient, Item, Recipe, SearchItem} from "@/app/lib/definitions";
import Image from "next/image";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import theme from "@/theme";
import React, {ReactNode, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {ITEM_IMAGE} from "@/app/lib/constants";
import ImageMissing from "/app/images/image-missing.webp";

const iconMap = {
    items: RectangleStackIcon,
    search: MagnifyingGlassIcon,
    recipes: ClipboardDocumentListIcon,
    addItem: PlusIcon,
    user: UserCircleIcon,
    pantryItem: undefined
};

export function Cards(
    {title, value, type, item,}:
        {
            title: string;
            value: number | string;
            type: 'items' | 'search' | 'recipes' | 'addItem' | 'pantryItem' | 'user';
            item?: CustomItem | Item | undefined;
        }) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl border-2 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700"/> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <div className="flex flex-col items-start justify-items-center px-4">
                {item?.image ? <Image src={item?.image as string} width={300} height={300} alt=""/> : null}

                <p className={"rounded px-4 text-center"}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export function ItemCard({
                             type,
                             item,
                         }: {
    title: string;
    subtitle?: string;
    image?: string;
    value: number | string;
    item: SearchItem;
    type: 'items' | 'search';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div>
                <h1>{item.brand}</h1>
            </div>
            <Link href={`/dashboard/pantry/add-item/items/${item.gtin}`} key={item.gtin}>
                <h2>{item.name}</h2>
            </Link>
        </div>
    );
}

const imageStyle = {
    objectFit: 'contain',
    paddingTop: '1rem',
    width: '100%',
    maxHeight: '500px',
};
const cardHeaderStyle = {
    color: 'white',
    backgroundColor: 'primary.light',
};

export function PantryItemCard({item}: { item: Item }): ReactNode {
    const image: string | undefined = item?.image || ITEM_IMAGE;
    return <Card key={item.id} sx={{position: 'relative', overflow: 'hidden', padding: '1rem'}}>
        {image ? <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={imageStyle}/> : <Image
            src={ImageMissing}
            width={600}
            alt={item.name}/>}

        <CardContent sx={{backgroundColor: "primary.contrastText"}}>
            <Typography variant={"h5"}>
                {item.name}</Typography>
            <Typography variant={'h6'}>{item.brand}</Typography>
            <Typography variant="h6">Quantity: {item.quantity}</Typography>
            <Typography variant="h6" color="secondary.main">Expires: {item.expirationDate}</Typography>
        </CardContent>
    </Card>;
}

export function ResultCard({item}: { item: SearchItem }): ReactNode {
    const image: string | undefined = item?.image;
    return <Card key={item.name} sx={{position: 'relative', overflow: 'hidden', padding: '1rem'}}>
        {image ? <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={imageStyle}/> :
            <Image
                src={ImageMissing}
                width={600}
                alt={item.name}/>}

        <CardContent sx={{backgroundColor: "primary.contrastText"}}>
            <Typography variant={"h5"}>
                {item.name}</Typography>
            <Typography variant={'h6'}>{item.brand}</Typography>
        </CardContent>
    </Card>;
}

export function RecipeCard({recipe}: { recipe: Recipe }): ReactNode {
    const image: string | undefined = recipe?.image || ITEM_IMAGE;
    const title: string = recipe?.title || 'Recipe';
    const ingredients: Ingredient[] = recipe?.usedIngredients || [];
    console.log('recipe', recipe, 'ingredients', ingredients)
    return (
        <Card key={recipe.id} sx={{position: 'relative', overflow: 'hidden', padding: '1rem'}}>
            {image ? <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.title}
                sx={imageStyle}/> : null}

            <CardContent sx={{backgroundColor: "primary.contrastText"}}>
                <Typography variant={"h5"}>
                    {title}</Typography>
                <Typography variant="h6">Ingredients:</Typography>
                {recipe.usedIngredients.map((ingredient: Ingredient) => (
                    <Typography key={ingredient.id} variant="h6">{ingredient.name}</Typography>
                ))}
            </CardContent>
        </Card>
    )
}

export function AddItemCard({item}: { item: Item }): ReactNode {
    const image: string | undefined = item?.image;
    const [isExpiryDate, setIsExpiryDate] = useState(false);
    console.log(isExpiryDate, 'isExpiryDate')
    return (
        <Box>
            <Card key={item.gtin}>

                {image ? <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={imageStyle}/> : <Image
                    src={ImageMissing}
                    width={600}
                    alt={item.name}/>}
                <CardContent>
                    <Typography variant={"h5"}>
                        {item.name}</Typography>
                </CardContent>
            </Card>
            <Box mt={'1rem'}>
                <Typography variant={'h6'}>Save this item to your pantry?</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Set the expiration date" name={"expirationDate"} disablePast={true}
                                    onChange={() => setIsExpiryDate(true)}/>
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            {isExpiryDate ? <Fab variant={'extended'} sx={{

                color: 'white',
                backgroundColor: theme.palette.primary.main,
                width: '100%',
                marginTop: '1rem',
            }}
                                 color={'inherit'}
                                 type={'submit'}
                                 onClick={() => setIsExpiryDate(true)}>

                <AddIcon/> Save Item
            </Fab> : null}
        </Box>
    )
}
