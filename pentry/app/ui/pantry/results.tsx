import {searchPaginatedItems} from "@/app/lib/data";
import {SearchPage} from "@/app/lib/definitions";
import {ItemCard} from "@/app/ui/dashboard/cards";

export default async function Results({
                                          query,
                                          currentPage, token
                                      }: {
    query: string;
    currentPage: number;
    token: string;
}) {
    const page: SearchPage | null = await searchPaginatedItems(query, token, currentPage);
    if (!page) return null;
    const items = page.content;
    return (
        <div>
            {items &&
                items.map((item) => (
                    <ItemCard title={item.name} value={item.brand} type={"search"}
                              item={item} key={item.gtin} subtitle={item.name}>

                    </ItemCard>

                ))}
        </div>
    );
}
