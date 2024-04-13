"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDateString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
    eid: string;
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

const EventCard = ({
    eid,
    name,
    event_location,
    time,
    category,
    description,
}: Props) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/event/${eid}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatDateString(time)}</CardDescription>
                <CardDescription>{event_location}</CardDescription>
                <CardDescription>Category: {category}</CardDescription>
            </CardHeader>

            <CardContent>
                <p>{description}</p>
            </CardContent>

            <CardFooter>
                <Button onClick={handleClick}>More Details</Button>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
