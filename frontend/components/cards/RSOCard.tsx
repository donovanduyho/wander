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
import { useState } from "react";

interface Props {
    name: string;
    description: string;
    rid: string;
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

const RSOCard = ({ name, description, rid }: Props) => {
    const auth = useAuthUser<UserData>();
    const [inRSO, setInRSO] = useState<boolean>(auth?.rid === rid);

    const handleSubmit = async () => {
        try {
            if (!inRSO) {
                // Join RSO through API endpoint
                await axios.post(`http://localhost:8000/rso/join`, {
                    rid: rid,
                    pid: auth?.pid,
                });
                setInRSO(true);
            } else {
                // Leave RSO through API endpoint
                await axios.delete(`http://localhost:8000/rso/leave`, {
                    data: {
                        rid: rid,
                        pid: auth?.pid,
                    },
                });
                setInRSO(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent>
                <p>{description}</p>
            </CardContent>

            <CardFooter className="flex flex-row gap-4">
                <Button onClick={handleSubmit}>
                    {!inRSO ? "Join" : "Leave"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RSOCard;
