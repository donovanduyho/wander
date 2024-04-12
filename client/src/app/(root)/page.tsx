"use client";

import EventCard from "@/components/cards/EventCard";
import { useEffect, useState } from "react";
import axios from "axios";

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
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/events/allEvents",
                    {
                        data: { uid: 1, rid: 1 },
                    }
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    console.log("events:", events);

    return (
        <>
            <h1 className="text-left text-white font-bold">Home</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <EventCard
                        key={event.eid} // Ensure each event has a unique key
                        eid={event.eid}
                        name={event.name}
                        event_location={event.event_location}
                        time={event.time}
                        category={event.category}
                        description={event.description}
                    />
                ))}
            </div>
        </>
    );
}
