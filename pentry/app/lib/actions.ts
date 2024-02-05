'use server';

import {z} from 'zod';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {auth, signIn} from '@/auth';
import {AuthError} from 'next-auth';
import {stringify} from "yaml";
import bcrypt from "bcryptjs";
import {DatabaseError, User} from "@/app/lib/definitions";
import {Key} from "react";

const apiUrl = process.env.SQL_DATABASE;

export async function searchItem(prevState: string | undefined, formData: FormData) {
    try {
        const res = await fetch(`${apiUrl}/api/v2/search/parameter/${formData.get('search')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
            },
        });
        console.log('Response Status:', res.status);
        const data = await res.json();
        console.log('data', data)
        revalidatePath('/search')
        return {message: stringify(data)}

    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw new Error('Failed to fetch data.');
    }
}

export async function createItem(pantryId: number, name: string, gtin: string, image: string, category: string, brand: string, formData: FormData) {
    console.log('apiUrl in createItem', apiUrl)
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
            gtin: gtin || formData.get('gtin'),
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
    redirect('/dashboard/pantry')

    /*
    * FIXME: Revalidate data
    */
    /*revalidatePath('/add')
    return {message: stringify(data)}*/


}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log('formData in authenticate', formData)
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.log('error type', error.type)
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
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

export async function newGoogleUser(formData: FormData) {
    console.log('formData', formData)
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        username: formData.get('username'),
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

export async function registerUser(prevState: string | undefined, formData: FormData) {
    console.log('formData', formData)
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    if (typeof password === "string" && typeof confirmPassword === "string") {
        if (password !== confirmPassword) {
            return 'Passwords do not match'
        } else {
            const user = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: await bcrypt.hash(password, 10),
                roles: 'USER',
                authProvider: 'credentials'

            }
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
            redirect('/login')
        }
    }
    //return something; // replace 'something' with the actual value you want to return
}

export async function registerUserByAdmin(formData: FormData) {
    const entries = Object.fromEntries(formData);
    /*const rawFormData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        roles: formData.get('roles')
    };*/
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
                password: await bcrypt.hash(password, 10),
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

export async function updateUser(id: string, formData: FormData) {
    const session = await auth()
    const token = session?.token
    console.log('id', id)
    console.log('formData', formData)

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
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
    revalidatePath('/dashboard/admin-page');
    revalidatePath('/dashboard');

}
