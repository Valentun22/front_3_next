"use client"

import {SessionProvider} from "next-auth/react";

export const ProvidersAuth = ({ children }: {children: React.ReactNode}) => {
    return <SessionProvider>{children}</SessionProvider>
};