"use client"
import { useEffect, useState } from "react"
import { getStudySets } from "@/services/StudySetService"

export type StudySetType = {
  id: number
  user_id: string
  title: string
  raw_text: string
  summary: string
  source_type: string
  created_at: Date
}

export default function StudySets({ userId }: { userId: string }) {
  const [studySets, setStudySets] = useState<StudySetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const sets = await getStudySets(userId);
        setStudySets(sets);
      } catch {
        setError("Fout tijdens het ophalen van de study sets.");
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, [userId]);

  if (loading) return <p>Laden...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {studySets.length > 0 ? (
        studySets.map((studySet) => (
          <div key={studySet.id} className="border rounded-lg p-4">
            <p className="font-medium">{studySet.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(studySet.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>Geen study sets gevonden.</p>
      )}
    </div>
  );
}