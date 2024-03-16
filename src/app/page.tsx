'use client';
import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
// import { auth } from '@/lib/auth';
// import { db } from '@/lib/db';
import { useSession, SessionProvider, signOut, signIn } from 'next-auth/react';
import Profile from '@/components/Profile/Profile';

export default function Home() {
    // const { data: session } = useSession();

    return (
        <div>
            <Button type='submit'>Click Me</Button>
            <form action={actions.SignIn}>
                <button type='submit'>Sign in with GitHub</button>
            </form>
            <form action={actions.SignOut}>
                <button type='submit'>Sign Out</button>
            </form>

            <Profile />
        </div>
    );
}
