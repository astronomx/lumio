import axios from "axios"

type ExtractTextResponse = { raw_text: string } | { error: string };

export const FileService = {
    async extractText(file: File | null): Promise<string> {
        if (!file) {
            throw new Error("No file provided");
        }

        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post<ExtractTextResponse>(
            `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/extract-text`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        if ("error" in data) {
            throw new Error(data.error);
        }

        return data.raw_text;
    }
}