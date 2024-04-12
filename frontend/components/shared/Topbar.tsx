"use client";

import Image from "next/image";
import Link from "next/link";

function Topbar() {
    return (
        <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-neutral-900 px-6 py-3">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/logo.svg" alt="logo" width={24} height={24} />
                <p className="text-xl font-bold  text-white max-xs:hidden">
                    Wander
                </p>
            </Link>
        </nav>
    );
}

export default Topbar;
