"use client";

import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { formatDateString } from "@/lib/utils";

interface Props {
    name: string;
    event_location: string;
    time: string;
    category: string;
    description: string;
}

const EventCard = ({
    name,
    event_location,
    time,
    category,
    description,
}: Props) => {
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
        </Card>
    );
};

export default EventCard;
