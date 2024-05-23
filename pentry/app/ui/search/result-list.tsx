import {Session} from "next-auth";
import {searchPaginatedItems} from "@/app/lib/data";
import ResultsAsList from "@/app/ui/search/resaults-as-list";

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
    const currentPage = Number(searchParams?.page) ?? 1;
    const query = searchParams?.query ?? '';
    const page = await searchPaginatedItems(query, session?.token, currentPage);
    const totalPages: number = page?.totalPages ?? 0;

    return (
        <div>
            <ResultsAsList
                page={page}
                totalPages={totalPages}
                query={query}
                currentPage={currentPage}
            />
        </div>
    );
}