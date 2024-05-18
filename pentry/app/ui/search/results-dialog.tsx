import {SearchPage} from "@/app/lib/definitions";
import {Results} from "@/app/ui/search/results";

export default function ResultsDialog({
                                          page, totalPages, query
                                      }: Readonly<{
    page: SearchPage;
    totalPages: number;
    query: string;
}>) {


    console.log('query in results dialog', query)
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