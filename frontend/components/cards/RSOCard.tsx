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
}

const RSOCard = ({ name }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent></CardContent>

            <CardFooter></CardFooter>
        </Card>
    );
};

export default RSOCard;
