"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z
    .object({
        university: z.string().min(3).max(30),
        username: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(3),
        passwordConfirm: z.string(),
        first_name: z.string().min(3).max(30),
        last_name: z.string().min(3).max(30),
        phone: z.string().min(10),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm;
        },
        {
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        }
    );

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            university: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            first_name: "",
            last_name: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        axios
            .post("http://localhost:8000/user/registerStudent", {
                username: values.username,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                email: values.email,
                university: values.university,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log({ values });
    };

    return (
        <div className="px-8 pt-2 flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Create Account</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="max-w-md w-full flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="university"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>University</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="University of Central Florida"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doe"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123-123-1234"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </Form>

            <div>
                <h3>Already have an account?</h3>
                <Link href="/sign-in">Login</Link>
            </div>
        </div>
    );
}
