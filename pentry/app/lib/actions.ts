'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {stringify} from "yaml";




// This is temporary
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function searchItem(prevState: string | undefined, formData: FormData) {
try {
    const res = await fetch(`http://localhost:8000/api/v2/search/parameter/${formData.get('search')}`, {
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

}
catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data.');
}
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
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}