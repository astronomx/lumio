import axios from "axios"

export const FileService = {
    async extractText(file: File, title: string) {
        try {
            const payload = { file: file, title: title };
            const res = await axios.post(`${process.env.LOCAL_API_URL}/extract-file`, payload);

            console.log(res);
        } catch(error) {
            return error;
        }
    }
}