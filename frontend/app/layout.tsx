import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { RequireAuth } from "react-auth-kit";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Wander",
    description: "University Event Tracking",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Topbar />

                <main className="flex flex-row">
                    <LeftSidebar />

                    <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28">
                        <div className="w-full max-w-4xl">{children}</div>
                    </section>

                    <RightSidebar />
                </main>
            </body>
        </html>
    );
}
