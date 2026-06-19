"use server"

import axios from "axios"

import { FileService } from "@/services/FileService";

export async function uploadStudySet(title: string, file: File | null): Promise<void> {
    if (!title.trim()) {
        throw new Error("Er is geen titel aan de study set gegeven");
    }

    if (!file) {
        throw new Error("Er is geen bestand geüpload");
    }

    const raw_text = await FileService.extractText(file);
    await createStudySet(title, raw_text);
}

async function createStudySet(title: string, text: string): Promise<void> {
    await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/create-study-set`, {
        title,
        text,
    });
}

