"use client";

import axios from "axios";
import EventCard from "@/components/cards/EventCard";
import { useState, useEffect } from "react";
import Comment from "@/components/forms/Comment";
import CommentCard from "@/components/cards/CommentCard";
import { Button } from "@/components/ui/button";
import { formatDateString } from "@/lib/utils";

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
    person_id: string;
    event_comment: string;
    rating: string;
    post_time: string;
}

const Page = ({ params }: { params: { id: string } }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

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
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getEvent();
        getComments();
    }, [params.id]);

    const toggleCommentForm = () => {
        setShowCommentForm((prevShowCommentForm) => !prevShowCommentForm);
    };

    return (
        <section>
            {event ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">{event.name}</h1>
                        <h2>{formatDateString(event.time)}</h2>
                        <h3>{event.event_location}</h3>
                        <h3>Category: {event.category}</h3>
                        <p>{event.description}</p>
                    </div>

                    <div>
                        <Button onClick={toggleCommentForm}>
                            {showCommentForm ? "Hide" : "Add a Comment"}
                        </Button>
                        {showCommentForm && <Comment />}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-xl">Comments</h2>
                        {comments.map((comment) => (
                            <CommentCard
                                cid={comment.cid}
                                pid={comment.person_id}
                                event_comment={comment.event_comment}
                                rating={comment.rating}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default Page;
