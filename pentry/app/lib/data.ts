import {sql} from '@vercel/postgres';
import {Item, ItemForm, PantryDto, SearchItem, SearchPage, User,} from './definitions';

const apiUrl = process.env.SQL_DATABASE || 'http://localhost:8000';

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

    const res = await fetch(`${apiUrl}/api/v2/search/paginated/parameter/${query}`, {
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

export async function fetchItemByGtin(gtin: string): Promise<Item> {
    console.log('inside fetchItemByGtin');
    const res = await fetch(`${apiUrl}/api/v2/search/product/${gtin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }, cache: "no-store",

    });
    const data = await res.json();
    console.log('Response in fetchItemsByGtin:', data);
    return data;
}

export async function fetchPantryByUserId(user_id: string): Promise<Promise<PantryDto> | Promise<null>> {
    console.log('user_id', user_id)
    if (!user_id) {
        return null;
    }
    const res: Response = await fetch(`${apiUrl}/api/v1/pantry/user/${user_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
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

export async function fetchUserByEmail(email: string): Promise<Promise<null> | Promise<User>> {
    console.log('email', email)
    console.log('apiUrl', apiUrl)
    if (!email) {
        return null;
    }
    const res: Response = await fetch(`${apiUrl}/api/v1/users/email/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
            },
        });
    console.log('Response Status:', res.status);
    if (res.status === 404) {
        return null
    }
    console.log('res', res)
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