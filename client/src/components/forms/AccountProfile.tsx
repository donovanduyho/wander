"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

interface Props {
    user: {
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        university: string;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            username: user?.username || "",
            password: user?.password || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            university: user?.university || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const user = await currentUser();
        if (!user) return null;

        // TODO (UPDATE USER PROFILE);
        axios
            .post("http://localhost:8000/user/registerSA", {
                username: values.username,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                email: values.email,
                university: values.university,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        router.push("/");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                First Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                Last Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                Phone
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="font-semibold text-white">
                                University
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="border bg-neutral-700 text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default AccountProfile;
