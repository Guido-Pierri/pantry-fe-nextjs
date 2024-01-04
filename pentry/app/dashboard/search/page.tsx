import SearchForm from "@/app/ui/search";
import Search from "@/app/ui/search";
import Results from "@/app/ui/search/results";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    let query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <Search placeholder={'search items'}/>
            {(query.length > 0) && <Results query={query} currentPage={currentPage}/>}

        </div>


    )
}