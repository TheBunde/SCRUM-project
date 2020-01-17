import axios from "axios";
import {authConfig} from "./UserService.js"

//let ipAdress = "10.24.3.122";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";
//let ipAdress = "10.22.2.85";

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




}