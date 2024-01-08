import SearchBar from "@/app/ui/searchBar";
import Results from "@/app/ui/search/results";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <SearchBar placeholder={'search products...'}/>
            {(query.length > 0) && <Results query={query} currentPage={currentPage}/>}

        </div>


    );
}