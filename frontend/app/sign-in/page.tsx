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
import { useRouter } from "next/navigation";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const FormSchema = z
    .object({
        username: z.string().min(3).max(30),
        password: z.string().min(3),
        passwordConfirm: z.string(),
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
    const router = useRouter();
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/user/login",
                {
                    username: values.username,
                    password: values.password,
                }
            );

            if (
                signIn({
                    auth: {
                        token: response.data.token,
                        type: "Bearer",
                    },
                    userState: {
                        uid: response.data.uid,
                        pid: response.data.pid,
                        spid: response.data.spid,
                        rid: response.data.rid,
                        username: response.data.username,
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        access: response.data.access,
                    },
                })
            ) {
                console.log("Success");
                router.push("/");
            } else {
                console.log("Fail");
            }
            console.log("Authenticated?:", isAuthenticated);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-8 pt-2">
            <h1 className="font-bold text-2xl">Login</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="max-w-md w-full flex flex-col gap-4"
                >
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
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
}
