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
import EditComment from "../forms/EditComment";

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
    const [editMode, setEditMode] = useState(false);

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
    }, [pid]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/comment/delete/${cid}`
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        setEditMode(true); // Set edit mode to true when Edit button is clicked
    };

    return (
        <div>
            {editMode ? ( // Render EditComment component if edit mode is active
                <EditComment
                    cid={cid}
                    pid={pid}
                    onCancel={() => setEditMode(false)}
                />
            ) : (
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
                                <Button onClick={handleEdit}>Edit</Button>
                                <Button onClick={handleDelete}>Delete</Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default CommentCard;
