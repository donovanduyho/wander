"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UniversityCard from "@/components/cards/UniversityCard";

export default function Discover() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Discover</h1>

            <Input type="text" placeholder="Search other universities" />
            <Button>Find</Button>

            <UniversityCard />
        </div>
    );
}
