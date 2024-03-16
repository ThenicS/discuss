'use server';
import { signIn, signOut } from 'next-auth/react';

export async function SignIn() {
    if (typeof window !== 'undefined') {
        // This code will only run on the client-side
        return await signIn('github');
    } else {
        // Handle the case where code is executed on the server-side
        console.error('Cannot execute SignIn on the server-side.');
        return null; // or handle differently as needed
    }
}

export async function SignOut() {
    if (typeof window !== 'undefined') {
        // This code will only run on the client-side
        return await signOut();
    } else {
        // Handle the case where code is executed on the server-side
        console.error('Cannot execute SignOut on the server-side.');
        return null; // or handle differently as needed
    }
}
// import { signIn } from '../lib/auth';
// import { signOut } from '../lib/auth';

// console.log('From actions', signIn);
// export async function SignIn() {
//     return signIn('github');
// }

// export async function SignOut() {
//     return signOut();
// }
