"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto bg-neutral-900 border-r pb-5 pt-28 max-md:hidden">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) &&
                            link.route.length > 1) ||
                        pathname === link.route;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                                isActive && "bg-blue-500"
                            }`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />

                            <p className="text-white font-semibold max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton
                        signOutCallback={() => router.push("/sign-in")}
                    >
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image
                                src="/assets/logout.svg"
                                alt="logout"
                                width={17}
                                height={17}
                            />

                            <p className="text-white font-semibold max-lg:hidden">
                                Logout
                            </p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
}

export default LeftSidebar;
