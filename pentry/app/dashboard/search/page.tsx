import SearchBar from "@/app/ui/searchBar";
import Results from "@/app/ui/search/results";
import ResultArray from "@/app/ui/search/ResultArray";
import {auth} from "@/auth";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const session = await auth()
    if (!session) {
        return null
    }
    const token = session?.token;
    console.log('query in Page', query)
    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <SearchBar placeholder={'search products...'}/>
            <Results query={query} token={token}>
                <ResultArray/>
            </Results>

        </div>


    );
}