const Page = () => {}
export default Page




/*
import React, { useState } from 'react'
//import { Image, Stack } from 'react-bootstrap'
import Spinner from '@/app/components/Spinner'
//import { useNavigate } from 'react'
import { useEffect } from 'react'
/!*import Button from '@/app/components/Button'
import LogoutButton from './LogOut'*!/
import { useFetchIsAuthenticated } from '../hooks/FetchIsAuthenticated'
//import { FetchUser } from '../hooks/FetchUser'
import { FetchIsLoading } from '../hooks/FetchIsLoading'
import { useParams } from 'react-router-dom'
import Item from '@/app/components/Item'
var ObjectId = require('bson-objectid')
const { v4: uuidv4 } = require('uuid')

const today = new Date().toISOString().split('T')[0]
console.log(today)

const Page = () => {
    const { isLoading } = FetchIsLoading()
    //const user = FetchUser()
    //const navigate = useNavigate()
    const [userData, setUserData] = useState(null)

    const today = new Date().toISOString().split('T')[0]
    // figure out how many days are between today and the expiration date
    const daysBetween = (date1: number, date2: number) => {
        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24
        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(date1 - date2)
        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY)
    }
    /!*const navigateToAddItem = () => {
        navigate('/additem')
    }*!/
    /!*const navigateToLogin = () => {
        navigate('/login')
    }*!/
    useEffect(() => {
        user && console.log('data in useEffect', user)
        if (useFetchIsAuthenticated && user?.email) {
            console.log('user inside callback FetchUSer', user)
            const fetchData = async () => {
                try {
                    // Fetch user data from the server when the component mounts
                    const response = await fetch(
                        `https://app-produkt-api-230801161903.azurewebsites.net/api/v1/users/user/${user.email}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json', // Set the correct Content-Type header
                            },
                            //
                        }
                    )
                    if (response.ok) {
                        const responseData = await response.json()
                        console.log('responseData', responseData)
                        responseData && setUserData(responseData)
                        console.log('userData', userData)
                    } else {
                        console.error('Error fetching user data')
                    }
                } catch (error) {
                    console.error('Error:', error)
                }
            }
            fetchData().then()
        }
    }, [user]) // Empty dependency array to fetch data once on component mount

    //parse a bson object id to a UUID
    //why is ObjectId undefined?

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : userData ? (
                userData.itemIds.map((item: any, index: React.Key | null | undefined) => (
                    <div key={index} className="p-2">
                        <Stack className=" text-center">
                            <Item item={item} daysBetween={daysBetween} today={today}></Item>
                        </Stack>
                    </div>
                ))
            ) : (
                <div>
                    <Spinner />
                </div>
            )}
        </>
    )
}
export default Page
// how can I use the id to navigate to the item detail page?
*/
