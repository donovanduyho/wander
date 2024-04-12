"use client";

import axios from "axios";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";

interface Event {
    eid: number;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/events/allEvents",
                    {
                        data: { uid: 1 },
                    }
                );
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllEvents();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Events</h1>
            {events.map((event) => (
                <EventCard
                    key={event.eid}
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
