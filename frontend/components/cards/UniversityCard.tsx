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
    uid: string;
}

export default function UniversityCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>University Card</CardTitle>
                <Image
                    src="/assets/ucf.jpg"
                    width={250}
                    height={250}
                    alt="UCF"
                    className="w-full h-64"
                />
                <CardDescription>Description</CardDescription>
            </CardHeader>

            <CardContent>
                <p>Content</p>
            </CardContent>

            <CardFooter>
                <p>Footer</p>
            </CardFooter>
        </Card>
    );
}
