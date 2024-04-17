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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

interface Props {
    cid: string;
    pid: string;
    onCancel: () => void;
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

export default function EditComment({ cid, pid, onCancel }: Props) {
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
            const response = await axios.put(
                `http://localhost:8000/comment/${cid}/edit`,
                {
                    cid: cid,
                    pid: pid,
                    event_comment: values.event_comment,
                    rating: values.rating,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Card>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="max-w-md w-full flex flex-col gap-4"
                    >
                        <CardHeader>
                            <CardTitle>Edit Comment</CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="event_comment"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
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

                            <div className="flex flex-row gap-2">
                                <Button type="submit">Submit</Button>
                                <Button type="submit" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
