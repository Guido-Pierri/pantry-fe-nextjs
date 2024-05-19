import {SearchPage} from "@/app/lib/definitions";
import Results from "@/app/ui/search/results";
import {searchPaginatedItems} from "@/app/lib/data";
import {auth} from "@/auth";

export default async function ResultsDialog({
                                                searchParams
                                            }: Readonly<{
    searchParams?: {
        page?: string;
        query?: string;
    };
}>) {

    const session = await auth()
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
            />
        </div>
    );
}