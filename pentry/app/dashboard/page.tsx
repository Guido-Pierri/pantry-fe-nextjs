const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
export default Dashboard



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
                //setUser(data)
                console.log('user inside callback', FetchUser)
                const fetchData = async () => {
                    try {
                        // Fetch user data from the server when the component mounts
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
                            const data = await response.json()
                            setIsInDatabase(true)
                            setUserData(data) // Update the state])
                            // setIsLoading(false)
                        } else {
                            console.error('Error fetching user data:', response.statusText)
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
                    //   const data = await response.json()
                    //   setSearchResult(data) // Set the fetched data to the searchResult state
                } else {
                    console.error('Error fetching data from the API')
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
