"use client"
import { useState } from "react"

type StudySetType = {
    id: number,
    user_id: string,
    title: string,
    raw_text: string,
    summary: string,
    source_type: string,
    create_at: Date
}


export default function StudySets({ userId }: { userId: string }) {
    const [studySets, setStudySets] = useState<StudySetType[]>([]);
    
    return (
        <div className="flex flex-col">

        </div>
    )
}