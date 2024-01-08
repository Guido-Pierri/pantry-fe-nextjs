import {searchItems} from "@/app/lib/data";
import {SearchItem} from "@/app/lib/definitions";
import {Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode} from "react";
import Link from "next/link";
import {ItemCard} from "@/app/ui/dashboard/cards";

export default async function Results({
                                          query,
                                          currentPage,
                                      }: {
    query: string;
    currentPage: number;
}) {
    const items: SearchItem[] = await searchItems(query, currentPage);
    console.log("items", items);
    console.log("items.data", items)
    return (
        <div>
            {items &&
                items.map((item: {
                    GTIN: Key | null | undefined;
                    Artikelbenamning: string | undefined;
                    Artikeltyp: string | undefined;
                    Varumarke: string | undefined;
                }) => (
                    <ItemCard title={item.Artikelbenamning as string} value={item.Varumarke as string} type={"search"}
                              item={item as SearchItem} key={item.GTIN} subtitle={item.Artikelbenamning}>

                    </ItemCard>

                ))}
        </div>
    );
}
