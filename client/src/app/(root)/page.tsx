"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/cards/EventCard";

export default function Home() {
    useEffect(() => {
        fetch("http://localhost:8000/person/getByEmail")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    return (
        <>
            <h1 className="text-left">Home</h1>
            <EventCard />
        </>
    );
}
