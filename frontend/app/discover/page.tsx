"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

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
                    uid: uni,
                }
            );
            setEvents(response2.data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderUniImage = () => {
        if (uni == "1") {
            return (
                <Image
                    src="/uploads/ucf.jpg"
                    width={250}
                    height={250}
                    alt="UCF"
                />
            );
        } else if (uni == "2") {
            return (
                <Image
                    src="/uploads/uf.jpg"
                    width={250}
                    height={250}
                    alt="UF"
                />
            );
        } else if (uni == "3") {
            return (
                <Image
                    src="/uploads/fsu.jpg"
                    width={250}
                    height={250}
                    alt="FSU"
                />
            );
        } else {
            return <div>Error</div>;
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

            {renderUniImage()}

            {events !== null &&
                events.length > 0 &&
                events.map((event) => (
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
            {events !== null && events.length === 0 && <p>No events found.</p>}
        </div>
    );
}
