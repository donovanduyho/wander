import RSOCard from "@/components/cards/RSOCard";

export default function Community() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">My RSOs</h1>
            <RSOCard />
        </div>
    );
}
