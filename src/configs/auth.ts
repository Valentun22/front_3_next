import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true},
                password: { label: 'password', type: 'password', required: true},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) return null;

                // const currentUser = users.find(user=> user.email === credentials.email)
                //
                // if (currentUser && currentUser.password === credentials.password) {
                //     const {password, ...userWithoutPass} = currentUser;
                //     return userWithoutPass as User;
                // }
                //todo доробити і експортнути { AuthOptions, User } from "next-auth";

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
        })
    ]
}

//todo Facebook ще не реагує , хоча вказані ключі