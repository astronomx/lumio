"use server"

import axios from "axios"

import { FileService } from "@/services/FileService";

async function createStudySet(title: string, text: string): Promise<void> {
    const payload = { title: title, text: text };

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/create-study-set`, payload);
    } catch(error: unknown) {
        console.error(error);
    }
}

export async function uploadStudySet(formData: FormData) {
    const file = formData.get("fileInput");
    const title = formData.get("titleOfStudySet") as string;

    if (!(file instanceof File)) {
        throw new Error("A file is required");
    }

    if (!title) {
        throw new Error("A title is required");
    }

    try {
        const raw_text: string = await FileService.extractText(file) as string;
        await createStudySet(title, raw_text);
    } catch (error: unknown) {
        console.error(error);
    }
}
