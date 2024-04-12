import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostEvent from "@/components/forms/PostEvent";
import axios from "axios";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const email = "johnsmith@ucf.edu";

    return (
        <>
            <h1 className="text-2xl font-bold text-white">Hello {user?.id}</h1>

            <PostEvent userEmail={email} />
        </>
    );
}

export default Page;
