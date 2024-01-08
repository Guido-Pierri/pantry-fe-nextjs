'use client';
import {useFormState} from "react-dom";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";

export default function SearchBar({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const {replace} = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        setSearchQuery(term)
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        console.log(params)
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    function handleClick() {
        const params = new URLSearchParams(searchParams);

        console.log(searchQuery)
        console.log(params)

        replace(`${pathname}?${searchQuery.toString()}`);

    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search:
            </label>
            <input
                className=" peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-400"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}

            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleClick()}>Submit
                </button>
            </div>
        </div>
    )
}