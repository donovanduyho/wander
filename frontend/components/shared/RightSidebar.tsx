"use client";

import { Checkbox } from "@/components/ui/checkbox";

function RightSidebar() {
    return (
        <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-transparent bg-neutral-900 px-10 pb-6 pt-28 max-xl:hidden">
            <div className="flex flex-1 flex-col justify-start items-center gap-4">
                <h3 className="font-bold text-white">Filter</h3>
                <ul className="flex flex-col gap-4">
                    <li className="space-x-2">
                        <Checkbox className="border-white" />
                        <label className="text-white font-semibold">
                            Public
                        </label>
                    </li>
                    <li className="space-x-2">
                        <Checkbox className="border-white" />
                        <label className="text-white font-semibold">
                            Private
                        </label>
                    </li>
                    <li className="space-x-2">
                        <Checkbox className="border-white" />
                        <label className="text-white font-semibold">
                            Organizations
                        </label>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default RightSidebar;
