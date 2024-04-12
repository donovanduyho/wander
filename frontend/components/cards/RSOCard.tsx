import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function RSOCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>RSO Card</CardTitle>
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
