"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/cards/EventCard";

export default function Home() {
    return (
        <>
            <h1 className="text-left text-white">Home</h1>
            <EventCard eid={1} />
        </>
    );
}
