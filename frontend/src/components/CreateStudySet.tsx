import { uploadStudySet } from "@/services/StudySetService";

export default async function CreateStudySet() {
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