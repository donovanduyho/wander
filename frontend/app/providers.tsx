"use client";

import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";

interface UserData {
    name: string;
    uid: string;
    email: string;
}

const store = createStore<UserData>({
    authName: "__auth",
    authType: "cookie",
    cookieDomain: "http://localhost:3000",
    cookieSecure: false,
});

const Providers = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <AuthProvider store={store}>{children}</AuthProvider>
        </>
    );
};

export default Providers;
