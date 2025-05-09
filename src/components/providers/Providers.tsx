"use client"

import {SessionProvider} from "next-auth/react";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    );
};

