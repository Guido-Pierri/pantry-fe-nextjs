'use client';
import {
    MagnifyingGlassIcon,
    ClipboardDocumentListIcon,
    RectangleStackIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import {lusitana} from '@/app/ui/fonts';
import Link from "next/link";
import {CustomItem, Item, SearchItem} from "@/app/lib/definitions";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import theme from "@/theme";
import React, {ReactNode, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {ITEM_IMAGE} from "@/app/lib/constants";

const iconMap = {
    items: RectangleStackIcon,
    search: MagnifyingGlassIcon,
    recipes: ClipboardDocumentListIcon,
    addItem: PlusIcon,
    pantryItem: undefined
};

export function Cards(
    {title, value, type, item,}:
        {
            title: string;
            value: number | string;
            type: 'items' | 'search' | 'recipes' | 'addItem' | 'pantryItem';
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
                <h1>{item.Varumarke}</h1>
            </div>
            <Link href={`/dashboard/pantry/add-item/items/${item.GTIN}`} key={item.GTIN}>
                <h2>{item.Artikelbenamning}</h2>
            </Link>
        </div>
    );
}

const imageStyle = {
    objectFit: 'contain',
    paddingTop: '1rem',
    width: '100%',
    maxHeight: '500px',

    /* width: '50%',
     marginLeft: '25%'*/
};
const cardHeaderStyle = {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
};

export function PantryItemCard({item}: { item: Item }): ReactNode {
    return <Card key={item.id} sx={{position: 'relative', overflow: 'hidden'}}>
        <CardHeader title={item.name}
                    sx={cardHeaderStyle}/>
        <CardMedia
            component="img"
            image={item.image}

            alt={item.name}
            sx={imageStyle}/>

        <CardContent>
            <Typography variant="h6" color="secondary.dark">Expires: {item.expirationDate}</Typography>
        </CardContent>
    </Card>;
}

export function AddItemCard({item}: { item: Item }): ReactNode {
    const image: string | undefined = item?.image || ITEM_IMAGE;
    const [isExpiryDate, setIsExpiryDate] = useState(false);
    console.log(isExpiryDate, 'isExpiryDate')
    return <Card key={item.gtin}>
        <CardHeader title={item.name}
                    sx={{
                        color: 'white',
                        backgroundColor: theme.palette.primary.main,
                    }}/>
        {image ? <CardMedia
            component="img"
            image={image}
            height="100"

            alt={item.name}></CardMedia> : null}
        <CardContent>
            {isExpiryDate ? <Fab variant={'extended'} sx={{
                position: 'absolute',
                right: '10%',
                bottom: '30%',
                color: 'white',
                backgroundColor: theme.palette.primary.main,
            }}
                                 color={'inherit'}
                                 type={'submit'}
                                 onClick={() => setIsExpiryDate(true)}>

                <AddIcon/> Save Item
            </Fab> : null}
            <Typography>Save this item to your pantry?</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Set the expiration date" name={"expirationDate"} disablePast={true}
                                onChange={() => setIsExpiryDate(true)}/>
                </DemoContainer>
            </LocalizationProvider>
            {/*<label className={'mt-2'} htmlFor={"expirationDate"}>Set the expiration date</label>
            <input placeholder={'Expiration date'} id={"expirationDate"} name={"expirationDate"} type={"date"}
                   onInput={() => setIsExpiryDate(true)}
                   required={true}/>*/}

        </CardContent>
    </Card>;
}