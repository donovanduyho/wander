"use client";

import CreateEvent from "@/components/forms/CreateEvent";
export default function Create() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Create an Event</h1>
            <CreateEvent />
        </div>
    );
}
