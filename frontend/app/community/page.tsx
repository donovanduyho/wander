"use client";

import RSOCard from "@/components/cards/RSOCard";
import NextAuth from "@auth-kit/next/NextAuth";
import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";

interface RSO {
    name: string;
}

interface UserData {
    uid: string;
}

export default function Community() {
    const [rso, setRso] = useState("");
    const auth = useAuthUser<UserData>();

    useEffect(() => {
        const getRsos = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/rso/showRSOs/${auth?.uid}`
                );
                setRso(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getRsos();
    }, []);

    return (
        <NextAuth fallbackPath="/sign-in">
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">RSOs</h1>
                <RSOCard name={rso} />
            </div>
        </NextAuth>
    );
}
