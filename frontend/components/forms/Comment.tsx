"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

interface Props {
    eid: string;
}

interface UserData {
    uid: string;
    pid: string;
    spid: string;
    rid: string;
    username: string;
    first_name: string;
    last_name: string;
    access: string;
}

const FormSchema = z.object({
    event_comment: z.string().min(3).max(50),
    rating: z.string().min(1),
});

export default function Comment({ eid }: Props) {
    const auth = useAuthUser<UserData>();
    const isAuthenticated = useIsAuthenticated();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            event_comment: "",
            rating: "0",
        },
    });

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/comment/${eid}/post`,
                {
                    pid: auth?.pid,
                    event_comment: values.event_comment,
                    rating: values.rating,
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="max-w-md w-full flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="event_comment"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
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

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
