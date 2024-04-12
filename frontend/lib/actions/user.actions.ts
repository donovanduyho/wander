"use server";

import axios from "axios";

export async function getUser(userId: string) {
    try {
        const response = await axios.get("http://localhost:8000/getByPid", {
            data: userId,
        });
        console.log("success", response);
    } catch (error) {
        console.log(error);
    }
}
