import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
    eid: number;
}

interface Details {
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

const EventCard = ({ eid }: Props) => {
    const [event, setEvent] = useState<Details | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/events/${eid}`
                );
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eid]);

    return (
        <>
            {event ? (
                <div className="text-white">
                    <h2>{event.name}</h2>
                    <p>{event.event_location}</p>
                    <p>{event.time}</p>
                    <p>{event.category}</p>
                    <p>{event.description}</p>
                </div>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </>
    );
};

export default EventCard;
