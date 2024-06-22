'use client';
import {
    ClipboardDocumentListIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    RectangleStackIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import {CustomItem, Ingredient, Item, Recipe, SearchItem, User} from "@/app/lib/definitions";
import Image from "next/image";
import {
    Avatar,
    Box,
    Card, CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Link as MaterialLink,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import theme from "@/theme";
import React, {ReactNode, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {ITEM_IMAGE} from "@/app/lib/constants";
import ImageMissing from "@/app/images/image-missing.webp";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteItemById} from "@/app/lib/actions";
import {useFormStatus} from "react-dom";
import Loading from "@/app/loading";
import TextField from "@mui/material/TextField";
import CardActionArea from "@mui/material/CardActionArea";

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
    maxHeight: '182px',
};


const cardHeaderStyle = {
    color: 'white',
    backgroundColor: 'primary.light',
};
const calculateExpiring = (date: string) => {
    const today = new Date()
    const expiration = new Date(date)
    const timeDiff = (expiration.getTime() - today.getTime());
    console.log('timeDiff', timeDiff)
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log('diffDays', diffDays)
    if (diffDays < 0) {
        return "expired";
    } else if (diffDays < 3) {
        return "expiring";
    } else {
        return "not expiring";
    }
}

export function PantryListItemCard({item, user}: {
    item: Item,
    user: User,
}): ReactNode {

    async function deleteItem(event: React.MouseEvent, id: string) {
        event.preventDefault(); // Add this line to prevent the default click event

        'use client'
        console.log('delete item')
        if (!user.token) return
        await deleteItemById(id, user.token)
    }


    return <Card
        sx={{
            backgroundColor: theme.palette.grey[50],
            borderRadius: '1rem',
        }}
    ><CardActionArea href={`/dashboard/pantry/items/${item.id}`}>
        {item?.image ?
            <CardMedia component={'img'}
                       alt={item.name}
                       sx={resultCardImageStyle}
                       image={item?.image}
                //style={{overflow: 'hidden', position: 'relative'}}
            >
            </CardMedia> : <Image src={ImageMissing} width={600} alt={item.name}/>}
        <Typography variant={'body1'} component={'div'} sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }}>            {item.name}
            {calculateExpiring(item.expirationDate) === "expiring" ?
                (<Typography color={'orange'} variant={'body2'}>Expires
                    soon!
                </Typography>) : calculateExpiring(item.expirationDate) === "expired" ?
                    <Typography color={'red'} variant={'body2'}>Expired</Typography> :
                    <Typography variant={'body2'}
                                color={'black'}>Expires {item.expirationDate}</Typography>}
        </Typography>
    </CardActionArea>
        <CardActionArea>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <DeleteIcon onClick={(event) => deleteItem(event, item.id)}/>
            </CardActions>
        </CardActionArea>
    </Card>;

}

export function PantryItemCard({item}: { item: Item }): ReactNode {
    const image: string | undefined = item?.image || ITEM_IMAGE;
    console.log('item', item, 'image', image)
    return <Card key={item.id} sx={{
        position: 'relative',
        overflow: 'hidden',
        padding: '1rem',
        borderRadius: '1rem',

    }}>
        {image ? <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={resultCardImageStyle}/> :
            <Image
                src={ImageMissing}
                width={600}
                alt={item.name}/>}

        <CardContent sx={{backgroundColor: "primary.contrastText"}}>
            <Typography variant={"h5"}>
                {item.name}</Typography>
            <Typography variant={'h6'}>{item.brand}</Typography>
            <Typography variant={"h6"}>Quantity: {item.quantity}</Typography>
            <Typography variant={'body1'} component={'div'}>
                {calculateExpiring(item.expirationDate) === "expiring" ?
                    (<Typography color={'orange'} variant={'body2'}>Expires
                        soon!
                    </Typography>) : calculateExpiring(item.expirationDate) === "expired" ?
                        <Typography color={'red'} variant={'body2'}>Expired</Typography> :
                        <Typography variant={'body2'}
                                    color={'black'}>Expires {item.expirationDate}</Typography>}
            </Typography> </CardContent>

    </Card>;
}

const resultCardImageStyle = {
    width: '100%',
    height: '182px',
    objectFit: 'contain',

};

export function ResultCard({item}: { item: SearchItem }): ReactNode {
    const image: string | undefined = item?.image;
    return <Card sx={{
        width: '100%',
        backgroundColor: 'background.default',
        borderColor: 'grey.200',
        borderWidth: 1,
        borderStyle: 'solid',
        mb: 2,
        boxShadow: 1
    }}>
        {image ? <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={resultCardImageStyle}
            /> :
            <Image
                src={ImageMissing}
                width={600}
                alt={item.name}/>}

        <CardContent sx={{backgroundColor: 'background.default'}}>
            <Typography color={'primary.main'} variant={'h6'}
                        sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {item.name}</Typography>
            <Typography variant="body2" color="text.secondary">{item.brand}</Typography>
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

export function AddItemCard() {
    const {pending} = useFormStatus();
    console.log('pending', pending)
    if (pending) {
        return <Loading/>
    }
    return (
        <Box>
            <Box flexDirection={'column'} border={"black"}>
                <Typography variant={'h6'}>
                    Save an item to your pantry
                </Typography>
                <TextField id={"name"}
                           name={"name"}
                           label={"Enter name"}
                           type={"text"}
                           placeholder={'Item'}
                           required={true}
                           fullWidth={true}
                           margin={"normal"}/>

                <TextField id={"expirationDate"}
                           name={"expirationDate"}
                           type={"date"}
                           required={true}
                           fullWidth={true}
                           margin={"normal"}/>
            </Box>
            <Box display={"flex"} justifyContent={'space-evenly'}>
                <Fab variant={'extended'} color={'primary'} type="submit" size={'small'} sx={{padding: '.5rem'}}>Save
                    Item</Fab>
                <Fab href={'/dashboard/pantry'} variant={'extended'} color={'primary'} size={'small'}
                     sx={{padding: '.5rem'}}>Cancel</Fab>
            </Box>
        </Box>
    )
}

export function SaveItemCard({item}: { item: Item }): ReactNode {
    const image: string | undefined = item?.image;
    const [isExpiryDate, setIsExpiryDate] = useState(false);
    const {pending} = useFormStatus();
    if (pending) {
        return <Loading/>;
    }
    console.log('pending in cards', pending)
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
