"use client";

import axios from "axios";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import Comment from "@/components/forms/Comment";

interface Event {
    eid: number;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/events/${params.id}`
                );
                setEvent(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getEvent();
    }, [params.id]);

    return (
        <section>
            {event ? (
                <EventCard
                    name={event.name}
                    event_location={event.event_location}
                    time={event.time}
                    category={event.category}
                    description={event.description}
                />
            ) : (
                <p>Loading...</p>
            )}

            <Comment />
        </section>
    );
};

export default Page;
