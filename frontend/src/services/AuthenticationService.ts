import { auth } from "@clerk/nextjs/server";

export async function isAuthenticated(): Promise<void | boolean> {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        throw new Error("Gebruiker is niet ingelogd");
    }
}