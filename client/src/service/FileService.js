import axios from "axios";
//let ipAdress = "10.24.3.122";
let ipAdress = "localhost";

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

    uploadFiles(files) {
        const url = "http://" + ipAdress + ":8080/uploadFiles";
        const formData = new FormData;
        files.forEach((file) => {
            formData.append("files", file);
        });
        const config = {
            headers : {
                'Content-Type' : "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);

    }




}