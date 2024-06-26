import {
    CustomItem,
    MyKitchenRecipesApiResponse,
    PantryDto,
    RecipeCollection,
    RecipeInformation,
    SearchItem,
    TranslationResponse,
    User,
} from './definitions';
import {auth} from "@/auth";
import {revalidatePath} from "next/cache";

const apiUrl = process.env.SQL_DATABASE;

export async function searchItems(query: string, token: string): Promise<SearchItem[]> {
    console.log('inside searchItems');
    console.log('query', query);

    const res = await fetch(`${apiUrl}/api/v1/search/parameter/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
    });

    console.log('Response Status:', res.status);

    if (!res.ok) {
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

export async function fetchAllUsers(): Promise<Promise<User[]> | null> {
    const session = await auth()

    const res = await fetch(`${apiUrl}/api/v1/users/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        cache: "no-store",
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

export async function fetchUserById(id: string): Promise<Promise<Promise<User>> | Promise<null>> {
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

export async function fetchCategories(): Promise<Promise<string[]>> {
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

export async function fetchSpoonacularRecipes(ingredients: string[]): Promise<Promise<RecipeCollection>> {
    console.log('ingredients', ingredients)
    const ingredientsString = ingredients.join(',')
    console.log('ingredientsString', ingredientsString)
    const translationResponse = await translateText(ingredientsString);
    console.log('translationResponse', translationResponse)
    const ingredientsTranslated = translationResponse[0]?.translations[0]?.text || ingredientsString;
    console.log('ingredientsTranslated', ingredientsTranslated)
    const apiKey = process.env.SPOONACULAR_API_KEY
    console.log('apiKey', apiKey)
    const urlApi = process.env.SPOONACULAR_API_URL
    console.log('urlApi', urlApi)
    const number = 10
    const url = `${urlApi}/recipes/findByIngredients?ingredients=${ingredientsTranslated}&number=${number}&ranking=1`
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

export async function fetchRecipeById(id: string): Promise<Promise<RecipeInformation>> {
    const apiKey = process.env.SPOONACULAR_API_KEY
    const urlApi = process.env.SPOONACULAR_API_URL
    const url = `${urlApi}/recipes/${id}/information?includeNutrition=false&addWinePairing=false&addTasteData=false`
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

export async function fetchPantryItemNames(userId: string): Promise<Promise<string[]>> {
    console.log('inside fetchPantryCategories')
    const session = await auth()
    console.log('session?.token', session?.token)
    const res = await fetch(`${apiUrl}/api/v1/pantry/article-names/${userId}`, {
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
    const fromLanguage = "sv";
    const toLanguage = "en";
    const url = `${endpoint}/translate?api-version=3.0&from=${fromLanguage}&to=${toLanguage}`;

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


