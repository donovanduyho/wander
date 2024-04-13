"use client";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

interface User {
    uid: string;
}

export default function Profile() {
    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated);
    console.log(auth);

    return <h1 className="font-bold text-2xl">Profile</h1>;
}
