"use client";

import axios from "axios";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import Comment from "@/components/forms/Comment";

interface Event {
    eid: string;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

interface Comment {
    cid: string;
    event_comment: string;
    rating: string;
    post_time: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/events/${params.id}`
                );
                setEvent(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getComments = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/comment/${params.id}/list`
                );
                setComments(response.data);
                console.log("comments:", response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getEvent();
        getComments();
    }, [params.id]);

    return (
        <section>
            {event ? (
                <div>
                    <EventCard
                        eid={event.eid}
                        name={event.name}
                        event_location={event.event_location}
                        time={event.time}
                        category={event.category}
                        description={event.description}
                    />
                    <h2>Comments</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Comment />
        </section>
    );
};

export default Page;
