import { useState, useEffect } from "react";

interface Props {
    eid: number;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

const EventCard = () => {
    const [event, setEvent] = useState<Props | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:8000/event/1");
                if (!res.ok) {
                    console.log("failed to fetch!");
                }

                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <h1>Event</h1>
            {event ? (
                <div>
                    <h2>{event.name}</h2>
                    <p>{event.event_location}</p>
                    <p>{event.time}</p>
                    <p>{event.category}</p>
                    <p>{event.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default EventCard;
