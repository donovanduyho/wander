"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import axios from "axios";

interface Event {
    eid: string;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

export default function Discover() {
    const [input, setInput] = useState("");
    const [uni, setUni] = useState("");
    const [events, setEvents] = useState<Event[]>([]);

    const handleInputChange = (e: any) => {
        setInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response1 = await axios.post(
                "http://localhost:8000/universities/searchForUni",
                {
                    search: input,
                }
            );
            setUni(response1.data);

            const response2 = await axios.post(
                "http://localhost:8000/events/allEvents",
                {
                    uid: response1.data,
                }
            );
            setEvents(response2.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Discover</h1>

            <Input
                type="text"
                placeholder="Search other universities"
                value={input}
                onChange={handleInputChange}
            />
            <Button onClick={handleSubmit}>Find</Button>

            {events.map((event) => (
                <EventCard
                    key={event.eid}
                    eid={event.eid}
                    name={event.name}
                    event_location={event.event_location}
                    time={event.time}
                    category={event.category}
                    description={event.description}
                />
            ))}
        </div>
    );
}
