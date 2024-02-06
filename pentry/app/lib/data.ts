import {Item, PantryDto, SearchItem, SearchPage, User,} from './definitions';
import {auth} from "@/auth";

const apiUrl =/* process.env.SQL_DATABASE || */'http://localhost:8080';

export async function getSession() {
    const session = await auth()
    return session?.user
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
    const session = await getSession()
    const res = await fetch(`${apiUrl}/api/v2/search/parameter/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,

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

export async function searchPaginatedItems(query: string, page?: number, itemsPerPage?: number): Promise<SearchPage> {
    console.log('query', query);
    const pageToFetch = page || 0;
    const size = itemsPerPage || 10;
    const session = await getSession()
    const res = await fetch(`${apiUrl}/api/v2/search/paginated/parameter/${query}?page=${pageToFetch}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
            , cache: "no-store",
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
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v2/search/product/${gtin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        }, cache: "no-store",

    });

    return await res.json();
}

export async function fetchPantryByUserId(user_id: string): Promise<Promise<PantryDto> | Promise<null>> {
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
    console.log('data', data)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const id = data.id;
    const userId = data.userId;
    const items = data.items;
    return {id, userId, items}
}


export async function fetchUserByEmail(email: string, token: string, refreshToken: string): Promise<Promise<null> | Promise<User>> {
    const session = await auth()
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
        return res.json();
    }
    if (res.status === 404) {
        return res.json();
    }

    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userEmail = data.email;
    const roles = data.roles;
    const authProvider = data.authProvider;
    const imageUrl = data.imageUrl;
    return {
        id,
        firstName,
        lastName,
        email: userEmail,
        imageUrl: imageUrl,
        password: '',
        roles: roles,
        authProvider: authProvider
    }


}

export async function fetchAllUsers(): Promise<User[]> {
    const session = await auth()

    const res = await fetch(`${apiUrl}/api/v1/users/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });

    return res.json();
}

export async function fetchAllRoles(): Promise<string[]> {
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v1/users/all-roles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });

    return res.json();
}

export async function fetchUserById(id: string): Promise<User> {
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });

    return res.json();
}