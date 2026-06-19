"use client"

import { uploadStudySet } from "@/services/StudySetService";
import { useState } from "react";

export default function CreateStudySet() {
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;

        if (files?.[0]) {
            setFile(files[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await uploadStudySet(title, file);
    }

    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-56">
            <input 
                type="text" 
                name="titleOfStudySet" 
                id="titleOfStudySet"
                className="border-2 border-border-secondary  rounded-md"
                onChange={handleTitleChange}
                required
            />

            <input 
                type="file" 
                name="pdfFile" 
                id="pdfFile"
                accept=".pdf" 
                onChange={handleFileChange} 
                required    
            />

            <button type="submit" className="">Create study set</button>
        </form>
    )
}