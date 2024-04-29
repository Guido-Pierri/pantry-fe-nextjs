// app/api/userByEmail/route.ts
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {auth} from "@/auth";
import {NextRequest, NextResponse} from "next/server";

const apiUrl = process.env.SQL_DATABASE;
const appUrl = process.env.NEXTAUTH_URL

export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get('email');
    const token = request.nextUrl.searchParams.get('token');
    const refreshToken = request.nextUrl.searchParams.get('refreshToken');

    //const email = request;
    const session = await auth()
    const cookieStore = cookies()
    //const token = cookieStore.get('token')

    /*if (!email || !token) {
        return NextResponse.error();
    }*/

    const res: Response = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

    if (res.status === 401) {
        const res: Response = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                },
            });
        return NextResponse.json(res);
    }
    if (res.status === 404) {
        return NextResponse.json(res);
    }

    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userEmail = data.email;
    return NextResponse.json({id, firstName, lastName, email: userEmail, password: ''});
}