import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function UniversityCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>University Card</CardTitle>
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
