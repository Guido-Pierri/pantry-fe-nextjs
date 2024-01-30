'use server';
import {Key} from "react";
import {ItemCard} from "@/app/ui/dashboard/cards";
import {SearchItem} from "@/app/lib/definitions";

export default async function ResultArray({items}: any) {
    return (
        items &&
        items.map((item: {
            GTIN: Key | null | undefined;
            Artikelbenamning: string | undefined;
            Artikeltyp: string | undefined;
            Varumarke: string | undefined;
        }) => (
            <ItemCard title={item.Artikelbenamning as string} value={item.Varumarke as string} type={"search"}
                      item={item as SearchItem} key={item.GTIN} subtitle={item.Artikelbenamning}>

            </ItemCard>

        ))
    )
}