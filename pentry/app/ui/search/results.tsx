'use client';
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import useSWRInfinite, {SWRInfiniteKeyLoader} from "swr/infinite";

export default function Results({children, query, token}: { children: React.ReactNode, query: string, token: string }) {
    // A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
    const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        console.log('query in getkey', query)
        return `/api/search-items/${query}?page=${pageIndex}`                    // SWR key
    }


    const fetcher = (url: string | URL | Request) => fetch(url, {headers: {'Authorization': `Bearer ${token}`}})
    console.log("query after fetcher", query)
    const {data, size, setSize} = useSWRInfinite(getKey, fetcher)
    if (!data) return 'loading'
    console.log("data", data)

    return <div>
        {children}
        <p>{data.length} users listed</p>
        {/* {data.map((users, index) => {
                // `data` is an array of each page's API response.
                return users.map((user: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => <div key={user.id}>{user.name}</div>)
            })}
            <button onClick={() => setSize(size + 1)}>Load More</button>*/}
    </div>
}

/*const [pageNumber, setPageNumber] = useState(0);
const [page, setPage] = useState(null)
const [items, setItems] = useState([]);
/!*const fetcher = (url: string | URL | Request) => fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was an error!', error);
    });*!/
const {
    data,
    error,
    isLoading
} = useSWR(`http://localhost:8080/api/v2/search/paginated/parameter/${query}?page=${pageNumber}`)
console.log("data", data)
useEffect(() => {
    const fetchData = () => {
        console.log("data", data)
        console.log('query', query)

        setPage(data);
    };

    fetchData();
}, [query, pageNumber, data]);
console.log("page", page)
console.log("items", items)*/


