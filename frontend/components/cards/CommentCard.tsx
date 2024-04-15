import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import { useState, useEffect } from "react";

interface Props {
    cid: string;
    pid: string;
    event_comment: string;
    rating: string;
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

const CommentCard = ({ cid, pid, event_comment, rating }: Props) => {
    const auth = useAuthUser<UserData>();
    const [isAuthor, setIsAuthor] = useState<boolean>(auth?.pid === pid);
    const [name, setName] = useState("");

    useEffect(() => {
        const getAuthorName = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/person/getByPid",
                    {
                        pid: pid,
                    }
                );
                setName(
                    response.data.first_name + " " + response.data.last_name
                );
            } catch (error) {
                console.log(error);
            }
        };

        getAuthorName();
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <p className="font-semibold">{rating}/5</p>
            </CardHeader>

            <CardContent>
                <p>{event_comment}</p>
            </CardContent>

            <CardFooter>
                {isAuthor && (
                    <div className="flex flex-row gap-2">
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default CommentCard;
