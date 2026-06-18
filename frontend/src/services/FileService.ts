import axios from "axios"

export const FileService = {
    async extractText(file: File): Promise<string> {
        try {
            const payload = { file: file };
            const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/extract-file`, payload) as ResponseType;

            console.log(res);
            
            return res;
        } catch(error) {
            return error as ResponseType;
        }
    }
}