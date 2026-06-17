"use server"

import { FileService } from "@/services/FileService";

import axios from "axios";

export default async function CreateStudySet() {  
    async function uploadStudySet(formData: FormData) {
        // Retrieve data from form
        const file = formData.get("fileInput");
        const title = formData.get("titleOfStudySet");

        // Check if a file is present
        if (!(file instanceof File)) {
            throw new Error("A file is required");
        }

        try {
            const raw_text: string = await FileService.extractText(file) as string;
            const payload = { tilte: title, text: raw_text };

            await axios.post(`${process.env.LOCAL_API_URL}/create-study-set`, payload);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    return (
        <form action={uploadStudySet}
            className="flex flex-col gap-3 w-56">
            <input 
                type="text" 
                name="titleOfStudySet" 
                id="titleOfStudySet"
                className="border-2 border-border-secondary  rounded-md"
                required
            />
            <input type="file" name="fileInput" id="fileInput" />

            <button className="">Create study set</button>
        </form>
    )
}