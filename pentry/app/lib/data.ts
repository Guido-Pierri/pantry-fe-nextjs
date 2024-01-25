import {Item, PantryDto, SearchItem, SearchPage, User,} from './definitions';
import {auth} from "@/auth";

const apiUrl =/* process.env.SQL_DATABASE || */'http://localhost:8080';

export async function getSession() {
    const session = await auth()
    return session
}

export async function fetchPantry(): Promise<PantryDto> {

    const res: Response = await fetch(`${apiUrl}/api/v1/pantry/1`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const userId = data.userId;
    const items = data.items;
    return {id, userId, items}
}

export async function searchItems(query: string, currentPage: number): Promise<SearchItem[]> {
    console.log('inside searchItems');
    console.log('query', query);

    const res = await fetch(`${apiUrl}/api/v2/search/parameter/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('Response Status:', res.status);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('API Response Data:', data);

    return data;
}

export async function searchPaginatedItems(query: string, currentPage: number): Promise<SearchPage> {
    console.log('inside searchPaginatedItems');
    console.log('query', query);
    const session = await getSession()
    console.log('session in searchPaginatedItems', session?.token)


    console.log('session in searchPaginatedItems', session?.token)
    const res = await fetch(`${apiUrl}/api/v2/search/paginated/parameter/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });

    console.log('Response Status:', res.status);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('API Response Data:', data);

    return data;
}

export async function fetchItemByGtin(gtin: string): Promise<Item> {
    console.log('inside fetchItemByGtin');
    const session = await getSession()
    console.log('session in fetchItemByGtin', session?.token)
    const res = await fetch(`${apiUrl}/api/v2/search/product/${gtin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        }, cache: "no-store",

    });
    //console.log('Response in fetchItemsByGtin:', data);
    return await res.json();
}

export async function fetchPantryByUserId(user_id: string): Promise<Promise<PantryDto> | Promise<null>> {
    console.log('user_id', user_id)
    if (!user_id) {
        return null;
    }
    const session = await auth()
    const token = session?.token
    const res: Response = await fetch(`${apiUrl}/api/v1/pantry/user/${user_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
                'Authorization': `Bearer ${token}`

            },
        });
    console.log('Response Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const userId = data.userId;
    const items = data.items;
    return {id, userId, items}
}

export async function fetchUserByEmail(email: string, token: string): Promise<Promise<null> | Promise<User>> {
    console.log('email in fetchUserByEmail ', email)
    console.log('token in fetchUserByEmail', token)
    if (!email || !token) {
        return null;
    }

    const res: Response = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
                'Authorization': `Bearer ${token}`
            },
        });
    console.log('Response Status for fetch:', res.status);
    if (res.status === 404) {
        return null
    }
    //console.log('res', res)
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userEmail = data.email;
    return {id, firstName, lastName, email: userEmail, password: ''}
}