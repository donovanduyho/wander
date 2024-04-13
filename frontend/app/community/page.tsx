"use client";

import RSOCard from "@/components/cards/RSOCard";
import NextAuth from "@auth-kit/next/NextAuth";
import { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";

interface RSO {
    name: string;
    description: string;
    rid: string;
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

export default function Community() {
    const [rsos, setRsos] = useState<RSO[]>([]);
    const auth = useAuthUser<UserData>();

    useEffect(() => {
        const getAllRsos = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/rso/showRSOs",
                    {
                        uid: auth?.uid,
                    }
                );
                setRsos(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllRsos();
    }, []);

    return (
        <NextAuth fallbackPath="/sign-in">
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">RSOs</h1>
                {rsos.map((rso, i) => (
                    <RSOCard
                        key={i}
                        name={rso.name}
                        description={rso.description}
                        rid={rso.rid}
                    />
                ))}
            </div>
        </NextAuth>
    );
}
