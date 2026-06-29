"use server"

import axios from "axios"
import { auth } from "@clerk/nextjs/server"
import { StudySetType } from "@/components/StudySets";

import { FileService } from "@/services/FileService";

export async function uploadStudySet(title: string, file: File | null): Promise<void> {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Je moet ingelogd zijn om een study set aan te maken");
    }

    if (!title.trim()) {
        throw new Error("Er is geen titel aan de study set gegeven");
    }

    if (!file) {
        throw new Error("Er is geen bestand geüpload");
    }

    const raw_text = await FileService.extractText(file);
    await createStudySet(title, raw_text, userId);
}

async function createStudySet(title: string, text: string, userId: string): Promise<void> {
    await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/create-study-set`, {
        title,
        text,
        user_id: userId,
    });
}

export async function getStudySets(userId: string): Promise<StudySetType[]> {
    return await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/get-study-sets?userId=${userId}`)
    .then(res => res.data.data);
}

