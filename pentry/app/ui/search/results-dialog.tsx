import Results from "@/app/ui/search/results";
import {searchPaginatedItems} from "@/app/lib/data";
import {Session} from "next-auth";

export default async function ResultsDialog({
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
            <Results
                page={page}
                totalPages={totalPages}
                query={query}
                currentPage={currentPage}
            />
        </div>
    );
}