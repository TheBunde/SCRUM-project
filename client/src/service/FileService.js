import axios from "axios";
let ipAdress = "localhost"

export class FileService {
    uploadImage(image) {
        const url = "http://" + ipAdress + ":8080/upload";
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