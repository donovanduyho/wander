import CreateRSO from "@/components/forms/CreateRSO";
import NextAuth from "@auth-kit/next/NextAuth";

export default function Page() {
    return (
        <NextAuth fallbackPath={"/sign-in"}>
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Register a RSO</h1>
                <CreateRSO />
            </div>
        </NextAuth>
    );
}
