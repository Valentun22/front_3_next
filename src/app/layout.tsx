import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/HeaderComponent/Header";
import React from "react";
import { Metadata } from "next";
import WarningModal from "@/components/warning-component/WarningComponent";

export const metadata: Metadata = {
    title: "Пиячок",
    description: "Generated your patty",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
               <Providers>
                       <Header/>
                       <WarningModal/>
                       {children}
               </Providers>
            </body>
        </html>
    );
}
//todo