"use client";

import CreateEvent from "@/components/forms/CreateEvent";
import NextAuth from "@auth-kit/next/NextAuth";

export default function Create() {
    return (
        <NextAuth fallbackPath={"/sign-in"}>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Create an Event</h1>
                <CreateEvent />
            </div>
        </NextAuth>
    );
}
