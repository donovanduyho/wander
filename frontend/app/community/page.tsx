"use client";

import RSOCard from "@/components/cards/RSOCard";
import NextAuth from "@auth-kit/next/NextAuth";

export default function Community() {
    return (
        <NextAuth fallbackPath="/sign-in">
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">My RSOs</h1>
                <RSOCard />
            </div>
        </NextAuth>
    );
}
