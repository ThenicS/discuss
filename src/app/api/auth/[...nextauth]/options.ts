import type { NextAuthOptions } from 'next-auth';
import type { PrismaClient } from '@prisma/client/extension';
import type { JWT } from 'next-auth/jwt';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(db) as PrismaClient,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            // authorization: {
            //     params: {},
            // },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.id_token = account.id_token;
                token.provider = account.provider;
                token.accessToken = account.access_token;
                token.uid = user.id;
            }
            return token;
        },
        async session({ session, trigger, newSession, token }) {
            // Note, that `rest.session` can be any arbitrary object, remember to validate it!
            if (trigger === 'update' && newSession?.user) {
                // You can update the session in the database if it's not already updated.
                // await adapter.updateUser(session.user.id, { name: newSession.name })

                // Make sure the updated value is reflected on the client
                session.user = newSession.user;
            }
            if (session?.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },

    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
    },
};
