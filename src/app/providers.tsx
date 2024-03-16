'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface Providers {
    children: React.ReactNode;
}

const Providers = ({ children }: Providers) => {
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
};

export default Providers;
