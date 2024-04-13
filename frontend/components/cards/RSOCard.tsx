import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
    name: string;
    description: string;
    rid: string;
}

const RSOCard = ({ name, description, rid }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent>
                <p>{description}</p>
            </CardContent>

            <CardFooter></CardFooter>
        </Card>
    );
};

export default RSOCard;
