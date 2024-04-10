import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser();
    if (userInfo?.onboarded) redirect("/");

    const userData = {
        id: user.id,
        name: userInfo ? userInfo?.name : "",
        university: userInfo ? userInfo?.university : "",
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="font-bold text-2xl text-white">Onboarding</h1>
            <p className="mt-3 text-white">
                Complete your profile to continue to Wander
            </p>

            <section className="mt-9 bg-neutral-800 p-10">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    );
}

export default Page;
