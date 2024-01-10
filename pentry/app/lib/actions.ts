'use server';

import {revalidatePath} from 'next/cache';
import {stringify} from "yaml";
import {User} from "@/app/lib/definitions";
import bcrypt from "bcryptjs";

const apiUrl = process.env.SQL_DATABASE || 'http://localhost:8000';

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

export async function addItem(pantryId: number, name: string, gtin: string, image: string, category: string, brand: string, formData: FormData) {
    console.log('pantryId', pantryId)
    console.log('formData', formData)
    try {
        const res = await fetch(`${apiUrl}/api/v1/pantry/create-item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name || formData.get('name'),
                quantity: formData.get('quantity'),
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
        return data
        /*revalidatePath('/add')
        return {message: stringify(data)}*/

    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw new Error('Failed to fetch data.');
    }
}

export async function registerUser(user: Omit<User, 'id'>) {
    const req = {...user, password: await bcrypt.hash(user.password, 10)}
    const res = await fetch(`${apiUrl}/api/v1/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('data', data)
}


