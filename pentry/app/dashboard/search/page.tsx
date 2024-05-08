import SearchBar from "@/app/ui/searchBar";
import Results from "@/app/ui/search/results";
import {auth} from "@/auth";
import {Suspense} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Loading from "@/app/loading";
import {MagnifyingGlassCircleIcon} from "@heroicons/react/24/outline";
import {EmojiFoodBeverage, FoodBankOutlined, NoFoodOutlined} from "@mui/icons-material";
import Image from "next/image";
import image from '/app/favicon.ico';
import Pagination from "@/app/ui/search/pagination";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) ?? 1;

    const session = await auth()
    if (!session?.token) {
        return null
    }
    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
            <SearchBar placeholder={'search products...'}/>
            {(query.length > 0) ?
                <Suspense fallback={<Loading/>}>
                    <Results query={query} currentPage={currentPage} token={session.token}/>
                </Suspense>

                :
                <Image src={image} alt={'prantry icon'} width={100} height={100} className={'mt-3'}/>}

        </div>


    );
}