import axios from "axios";
import {authenticationHeader} from "./UserService";

let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

export class FileService {
    uploadImage(image) {
        const url = "http://" + ipAdress + ":8080/upload";
        const formData = new FormData();
        formData.append("file", image);
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                "authorization": localStorage.getItem("token")
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
                'Content-Type' : "multipart/form-data",
                "authorization": localStorage.getItem("token")
            }
        };
        return axios.post(url, formData, config);

    }

    uploadFile(file) {
        const url = "http://" + ipAdress + ":8080/uploadFile";
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);
    }

    getFile(fileName) {
        const url = "http://" + ipAdress + ":8080/image/" + fileName;
        console.log("URL:");
        console.log(url);
        return axios.get(url);
    }




}