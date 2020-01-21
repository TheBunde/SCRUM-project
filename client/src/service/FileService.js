import axios from "axios";
import { authenticationHeader } from "./UserService";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

/**
 * Class to handle file services
 */
export class FileService {
  /**
   *
   * @param {image} image - Takes a image
   */
  uploadImage(image) {
    const url = "http://" + ipAdress + ":8080/upload";
    const formData = new FormData();
    formData.append("file", image);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  /**
   *
   * @param {file} files - Takes multiple files
   */
  uploadFiles(files) {
    const url = "http://" + ipAdress + ":8080/uploadFiles";
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  /**
   *
   * @param {file} file - Takes one file
   */
  uploadFile(file) {
    const url = "http://" + ipAdress + ":8080/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
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
