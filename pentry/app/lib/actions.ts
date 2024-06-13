'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {auth, signIn} from '@/auth';
import {AuthError} from 'next-auth';
import bcrypt from "bcryptjs";
import {DatabaseError} from "@/app/lib/definitions";
import {fetchPantryByUserId} from "@/app/lib/data";

const apiUrl = process.env.SQL_DATABASE;

export async function saveSearchItem(pantryId: number, name: string, gtin: string, image: string, category: string, brand: string, formData: FormData) {
    console.log('pantryId', pantryId)
    console.log('formData', formData)
    const quantity = "1"
    const session = await auth()
    const token = session?.token

    const res = await fetch(`${apiUrl}/api/v1/pantry/create-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name || formData.get('name'),
            quantity: quantity || formData.get('quantity'),
            expirationDate: formData.get('expirationDate'),
            brand: brand || formData.get('brand'),
            image: image || formData.get('image'),
            category: category || formData.get('category'),
            pantryId: pantryId,
        }),
    });
    console.log('body', res.body)
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
    revalidatePath('/dashboard/pantry')

    redirect('/dashboard/pantry')

}

export async function saveCustomItem(state: null | undefined, formData: FormData): Promise<Promise<any> | Promise<string>> {
    const quantity = '1'
    const session = await auth()
    const token = session?.token
    const userId = session?.user.id
    if (userId === undefined) {
        return 'No user id found. Please sign in.'
    }
    const pantry = await fetchPantryByUserId(userId)
    console.log('pantry', pantry)
    const pantryId = pantry?.id
    const body = {
        name: formData.get('name'),
        quantity: quantity,
        expirationDate: formData.get('expirationDate'),
        brand: 'Custom',
        image: 'https://picsum.photos/id/493/200',
        category: 'category',
        pantryId: pantryId,
    }

    const res = await fetch(`${apiUrl}/api/v1/pantry/create-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });
    console.log('Response Status:', res.status);
    if (res.status === 403) {
        return 'Error'
    }
    revalidatePath('/dashboard/pantry')
    redirect('/dashboard/pantry')
}

export async function deleteItemById(id: string, token: string) {
    const res = await fetch(`${apiUrl}/api/v1/pantry/delete-item/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    console.log(res.status)
    revalidatePath('/dashboard/pantry')
    return res.status;

}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid email or password.';
                case 'CallbackRouteError':
                    return /*redirect('/signup')*/'User not found.';
                default:
                    return 'Something went wrong.';
            }
        }
        if (error instanceof DatabaseError) {
            redirect('/signup')
        }
        throw error;
    }
}

export async function createPantry(id: number) {
    console.log('id in createPantry', id)
    try {
        const res = await fetch(`${apiUrl}/api/v1/pantry/create-pantry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: id
            }),
        });
        console.log('Response Status:', res.status);
        const data = await res.json();
        console.log('data', data)
        return data
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw new Error('Failed to fetch data.');
    }
}

export async function createGoogleUser(formData: FormData) {
    console.log('inside newGoogleUser')
    console.log('formData', formData)
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        imageUrl: formData.get('imageUrl'),
        username: formData.get('username'),
        roles: 'USER',
        authProvider: 'google'
    }
    const res = await fetch(`${apiUrl}/api/v1/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
    const userId = data.id
    console.log('userId', userId)
    const pantry = await createPantry(userId)
    console.log('pantry', pantry)
    //redirect('/dashboard')
    return data
}

export async function registerUser(formData: FormData) {
    console.log('formData in registerUser', formData)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    console.log('password', password)
    console.log('confirmPassword', confirmPassword)
    if (typeof password === "string" && typeof confirmPassword === "string") {
        if (password !== confirmPassword) {
            return 'Passwords do not match'
        } else {
            const req = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password'),
                roles: 'USER',
                authProvider: 'credentials'

            }
            console.log('req', req)
            const res = await fetch(`${apiUrl}/api/v1/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            console.log('Response Status:', res.status);
            /*console.log('res', res)
            const data = await res.json();
            console.log('data', data)
            const userId = data.id
            console.log('userId', userId)
            const pantry = await createPantry(userId)
            console.log('pantry', pantry)*/
            redirect('/login')
        }
    }
}

export async function registerUserByAdmin(formData: FormData) {
    const entries = Object.fromEntries(formData);
    console.log(entries);
    console.log(typeof entries.firstName);
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const message = 'user created'
    if (typeof password === "string" && typeof confirmPassword === "string") {
        if (password !== confirmPassword) {
            return 'Passwords do not match'
        } else {
            const user = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: password,
                roles: formData.get('roles'),
                authProvider: formData.get('authProvider')
            }
            // Handle user creation for 'ADMIN' role
            const req = {
                ...user
            }
            const res = await fetch(`${apiUrl}/api/v1/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            console.log('Response Status:', res.status);
            console.log('res', res)
            const data = await res.json();
            console.log('data', data)
            const userId = data.id
            console.log('userId', userId)
            const pantry = await createPantry(userId)
            console.log('pantry', pantry)
            revalidatePath('/dashboard/admin-page');
            return message
        }

    }
}

export async function deleteUser(id: string) {
    const session = await auth()
    const token = session?.token
    const res = await fetch(`${apiUrl}/api/v1/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
    revalidatePath('/dashboard/admin-page');

}

export async function deleteUserFromProfile(id: string) {
    const session = await auth()
    const token = session?.token
    console.log('inside deleteUserFromProfile')
    const res = await fetch(`${apiUrl}/api/v1/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
    revalidatePath('/dashboard');
    redirect('/dashboard');

}

export async function updateUser(id: string, formData: FormData) {
    const session = await auth()
    const token = session?.token

    const req = {
        ...formData,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        roles: formData.get('roles'),
    }
    const res = await fetch(`${apiUrl}/api/v1/users/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(req)

    });
    if (res.status === 400) {
        console.log(res.status)
        return null
    }
    //const data = await res.json();
    //console.log('data', data)
    revalidatePath('/dashboard/admin-page');
    revalidatePath('/dashboard');
    redirect('/dashboard/admin-page');

}

export async function updateUserProfile(id: string | undefined, formData: FormData) {
    const session = await auth()
    const token = session?.token
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    if (typeof password === "string" && typeof confirmPassword === "string") {
        if (password !== confirmPassword) {
            return 'Passwords do not match'
        }
        console.log('formData in updateUserProfile', formData)
        const req = {
            ...formData,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: await bcrypt.hash(password, 10),
        }
        console.log('req', req)
        console.log('id', id)
        const res = await fetch(`${apiUrl}/api/v1/users/update-user-profile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(req)

        });
        if (res.status === 400) {
            console.log(res.status)
            return null
        }
        revalidatePath('/dashboard');
        redirect('/dashboard');

    }

}
