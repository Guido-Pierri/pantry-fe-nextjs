import { Card } from '@/app/ui/dashboard/cards';
/*import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';*/
import {croissant, lusitana} from '@/app/ui/fonts';
import {
    /*fetchRevenue,
    fetchLatestInvoices,
    fetchItems,*/
    fetchCardData, fetchPantry,
    fetchPantryByUserId,
    fetchUserByEmail
} from '@/app/lib/data';
import Link from "next/link";
import {auth} from "@/auth";

export default async function Page() {
    const  user  = await auth()
    const userEmail = user?.user?.email as string
    console.log('user session', user?.user)
    const {firstName,lastName,id,email} =  await fetchUserByEmail( userEmail)
    /*const {
        numberOfItems,
        /!*numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,*!/
    } = await fetchCardData();*/
    const {items} = await fetchPantryByUserId(id)
    return (
        <main>
            <h1 className={`${croissant.className} mb-4 text-xl md:text-2xl`}>
                Dashboard {`${firstName} ${lastName}`}
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-blue-400">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}

                { <Link href="/dashboard/pantry"><Card title="Items in Pantry" value={items.length} type="items" /></Link> }

                {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
            </div>
            {/*<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">*/}
                {/* <RevenueChart revenue={revenue}  /> */}
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
            {/*</div>*/}
        </main>
    );
}
async function getData() {
    const res = await fetch('http://localhost:8000/api/v1/pantry/1')
    console.log('res', res)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


/*
import MyPantry from './MyPantry'
import Navbar from './Navbar'
import { useEffect, useState, useRef } from 'react'
import Spinner from './Spinner'
import { useFetchIsAuthenticated } from '../hooks/FetchIsAuthenticated'
import { FetchUser } from '../hooks/FetchUser'
import { FetchIsLoading } from '../hooks/FetchIsLoading'
import Button from './common/Button'
import './dashboard.css'
const Dashboard = () => {
    const { isLoading } = FetchIsLoading()
    const user = FetchUser()
    //const { user, isAuthenticated, isLoading } = useAuth0()

    const [userData, setUserData] = useState(null)
    //const [user, setUser] = useState()
    //const [isLoading, setIsLoading] = useState(true)
    const userRef = useRef() // Create a ref for user

    const [isInDatabase, setIsInDatabase] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (user && user?.email) {
                userRef.current = user // Update the ref
                //setUser(data.ts)
                console.log('user inside callback', FetchUser)
                const fetchData = async () => {
                    try {
                        // Fetch user data.ts from the server when the component mounts
                        const response = await fetch(
                            `https://app-produkt-api-230801161903.azurewebsites.net/api/v1/users/user/${user?.email}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json', // Set the correct Content-Type header
                                },
                            }
                        )
                        if (response.ok) {
                            const data.ts = await response.json()
                            setIsInDatabase(true)
                            setUserData(data.ts) // Update the state])
                            // setIsLoading(false)
                        } else {
                            console.error('Error fetching user data.ts:', response.statusText)
                        }
                    } catch (error) {
                        console.error('Error:', error)
                    }
                }

                fetchData()
            }
        }, 2000)
    }, [user, setIsInDatabase])
    //useEffect(() => {
    async function createUser() {
        if (!isInDatabase && user) {
            const requestData = {
                firstName: user?.given_name,
                lastName: user?.family_name,
                email: user?.email,
            }
            try {
                const response = await fetch(
                    `https://app-produkt-api-230801161903.azurewebsites.net/api/v1/users/create`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestData),
                    }
                )
                if (response.status === 201) {
                    //   const data.ts = await response.json()
                    //   setSearchResult(data.ts) // Set the fetched data.ts to the searchResult state
                } else {
                    console.error('Error fetching data.ts from the API')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        // if (!isInDatabase && user) {
        //   createUser()
        // }
    }
    // }
    //, [isInDatabase])
    if (!isInDatabase && user) {
        createUser()
    }
    return (
        <>
            {!userData && (
                <div>
                    <Navbar />
                    <Spinner />
                </div>
            )}
            {isLoading ? (
                <Spinner />
            ) : (
                useFetchIsAuthenticated &&
                userData && (
                    <div>
                        <Navbar></Navbar>
                        <div className="title">{user.given_name}'s Pantry</div>
                        <MyPantry></MyPantry>
                    </div>
                )
            )}
        </>
    )
}
export default Dashboard
*/
