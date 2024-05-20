import {
    CustomItem,
    Item,
    MyKitchenRecipesApiResponse,
    PantryDto,
    RecipeCollection,
    SearchItem,
    SearchPage, TranslationResponse,
    User,
} from './definitions';
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";

const apiUrl = process.env.SQL_DATABASE;

export async function getSession() {
    const session = await auth()
    return session?.user
}

export async function searchItems(query: string, currentPage: number): Promise<SearchItem[]> {
    console.log('inside searchItems');
    console.log('query', query);
    const session = await getSession()
    const res = await fetch(`${apiUrl}/api/v1/search/parameter/${query}`, {
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

export async function searchPaginatedItems(query: string, token: string, page?: number, size?: number) {
    console.log('inside searchPaginatedItems')
    console.log('query', query);
    console.log('token', token)
    console.log('page', page)
    console.log('apiUrl in searchPaginatedItems ', apiUrl)
    const pageToFetch = page ? (page - 1) : 0;


    const res = await fetch(`${apiUrl}/api/v1/search/paginated/parameter/${query}?page=${pageToFetch}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                ,
            },
        });
    if (res.status === 403) {
        console.log('res.status', res.status)
        return null;
    }
    console.log('Response Status:', res.status);
    console.log('response body:', res.body)
    const data = await res.json();
    console.log('API Response Data:', data);
    return data;
}

export async function fetchItemByGtin(gtin: string): Promise<CustomItem> {
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v1/search/product/${gtin}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        }, cache: "no-store",

    });

    return await res.json();
}

export async function fetchItemById(id: string): Promise<CustomItem> {
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v1/pantry/item/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        }, cache: "no-store",
        mode: 'no-cors'

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
    if (res.status === 403) {
        // This will activate the closest `error.js` Error Boundary
        //throw new Error('Failed to fetch data')
        return null;
    }
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
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

export async function fetchAllUsers(): Promise<Promise<User[]> | null> {
    const session = await auth()

    const res = await fetch(`${apiUrl}/api/v1/users/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });
    if (res.status === 403) {
        // This will activate the closest `error.js` Error Boundary
        //throw new Error('Failed to fetch data')
        return null;
    }
    return res.json();
}

export async function fetchAllRoles(): Promise<Promise<string[]> | null> {
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

export async function fetchUserById(id: string): Promise<Promise<User> | null> {
    const session = await auth()
    console.log('session?.token', session?.token)
    const res = await fetch(`${apiUrl}/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });
    console.log('Response Status:', res.status);
    if (res.status === 403) {
        return null;
    }
    return res.json();
}

export async function fetchCategories(): Promise<Promise<string[]> | null> {
    const session = await auth()
    const res = await fetch(`${apiUrl}/api/v1/pantry/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });
    console.log(res.status)
    return res.json();
}

export async function fetchRecipes(ingredients: string): Promise<Promise<RecipeCollection>> {
    console.log('ingredients', ingredients)

    const apiKey = process.env.SPOONACULAR_API_KEY
    console.log('apiKey', apiKey)
    const urlApi = process.env.SPOONACULAR_API_URL
    console.log('urlApi', urlApi)
    const number = 10
    const url = `${urlApi}/recipes/findByIngredients?ingredients=${ingredients}&number=${number}`
    console.log('url', url)
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${apiKey}`
        },
    });
    return res.json();
}

export async function fetchMyKitchenRecipes(ingredients: string[]): Promise<Promise<MyKitchenRecipesApiResponse>> {
    console.log('ingredients', ingredients)
    const ingredientsArray = ingredients.map((item) => item.toLowerCase().replace(/\s+/g, '')).slice(0, 3);
    const urlApi = process.env.MYKITCHENRECIPES_API_URL
    console.log('urlApi', urlApi)
    const limit = 3
    const url = `${urlApi}?limit=${limit}`
    console.log('url', url)
    const body = JSON.stringify({availableIngredients: ingredientsArray});
    console.log('body', body)
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    });
    revalidatePath('/dashboard/recipies')
    return res.json();
}

export async function fetchPantryCategories(): Promise<Promise<string[]>> {
    console.log('inside fetchPantryCategories')
    const session = await auth()
    console.log('session?.token', session?.token)
    const res = await fetch(`${apiUrl}/api/v1/pantry/article-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    });
    console.log('Response Status:', res.status);
    if (res.status === 403) {
        return [];
    }
    return res.json();
}


export async function translateText(text: string): Promise<TranslationResponse> {
    const {v4: uuidv4} = require('uuid');

    const key = "6e4fc531bb7e4fc0ba0157b155bc04bf";
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const location = "swedencentral";
    const url = `${endpoint}/translate?api-version=3.0&from=en&to=sv`;

    const headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
    };

    const body = JSON.stringify([
        {
            'text': text
        }
    ]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Translated text:', data?.[0]?.translations?.[0]?.text);
        console.log('stringified:', JSON.stringify(data, null, 4));
        return data;
    } catch (error) {
        console.error('Error translating text:', error);
        return [];
    }
}


