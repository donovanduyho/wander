"use client";

import { useEffect, useState } from "react";

export default function Home() {
    useEffect(() => {
        fetch("http://localhost:8000/test/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    return (
        <>
            <h1 className="text-left">Home</h1>
        </>
    );
}
