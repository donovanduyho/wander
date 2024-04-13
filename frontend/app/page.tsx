"use client";

import axios from "axios";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useRouter } from "next/navigation";

interface Event {
    eid: string;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

interface UserData {
    uid: string;
    pid: string;
    spid: string;
    rid: string;
    username: string;
    first_name: string;
    last_name: string;
    access: string;
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const auth = useAuthUser<UserData>();
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/events/allEvents",
                    {
                        uid: auth?.uid,
                        rid: auth?.rid,
                    }
                );
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isAuthenticated) {
            router.push("/sign-in");
        } else {
            getAllEvents();
        }
    }, [isAuthenticated, auth]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Events</h1>
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
