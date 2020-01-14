import axios from "axios";

export class FileService {
    uploadImage(image) {
        const url = "http://localhost:8080/upload";
        const formData = new FormData();
        formData.append("file", image);
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);
    }
}