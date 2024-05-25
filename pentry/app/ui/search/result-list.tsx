import {Session} from "next-auth";
import {searchItems} from "@/app/lib/data";
import ResultsAsList from "@/app/ui/search/results-as-list";

export default async function ResultsList({
                                              searchParams, session
                                          }: Readonly<{
    searchParams?: {
        page?: string;
        query?: string;
    }, session: Session;
}>) {

    //const session = await auth()
    if (!session?.token) {
        return null
    }
    const query = searchParams?.query ?? '';
    const items = await searchItems(query, session?.token);

    return (
        <ResultsAsList
            items={items}
            query={query}
        />
    );
}