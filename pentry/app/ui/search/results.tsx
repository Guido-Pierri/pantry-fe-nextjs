import {searchItems} from "@/app/lib/data";
import {SearchItem} from "@/app/lib/definitions";
import {Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode} from "react";

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
                    Artikelbenamning: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;
                    Artikeltyp: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;
                }) => (
                    <div className="text-white" key={item.GTIN}>
                        <h2 className="text-white">{item.Artikelbenamning}</h2>
                        {/*<p className={"text-white"}>{item.Artikeltyp}</p>*/}
                    </div>
                ))}
        </div>
    );
}
