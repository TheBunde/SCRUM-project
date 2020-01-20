import axios from 'axios';
import {authenticationHeader} from "./UserService";

let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

class AdminService{


    updateUser(name, email,phone, userID) {
        return axios.put("http://localhost:8080/api/users/" + userID + "/newName", {
            name: name,
            email: email,
            phone: phone
        }, {headers: authenticationHeader()}).then(response => response.data);
    }
    updateName(name, userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/newName", {name: name}, {headers: authenticationHeader()}).then(response => response.data);

    }

    updatePhone(phone, userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/newPhone", {phone: phone}, {headers: authenticationHeader()}).then(response => response.data);
    }

    updateEmail(email, userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/newEmail", {email: email}, {headers: authenticationHeader()}).then(response => response.data);
    }

    getRoles(){
        return axios.get("http://" + ipAdress + ":8080/roles", {headers: authenticationHeader()}).then(response => response.data);
    }

    getRoleByID(roleID){
        return axios.get("http://" + ipAdress + ":8080/role/" + roleID, {headers: authenticationHeader()}).then(response => response.data);
    }

    getRole(role){
        return axios.get("http://" + ipAdress + ":8080/roles/" + role, {headers: authenticationHeader()}).then(response => response.data);
    }

    assignRole(userID, roleID){
        return axios.post("http://" + ipAdress + ":8080/users/" + userID + "/role/", {roleID: roleID}, {headers: authenticationHeader()}).then(response => response.data);
    }

    getUser(userID){
        return axios.get("http://" + ipAdress + ":8080/user/" + userID, {headers: authenticationHeader()}).then(response => response.data);
    }

    getUsers(){
        return axios.get("http://" + ipAdress + ":8080/users/", {headers: authenticationHeader()}).then(response => response.data);
    }

    deleteUser(userID){
        return axios.delete("http://" + ipAdress + ":8080/users/" + userID, {headers: authenticationHeader()}).then(response => response.data);
    }

    approveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/approve", {}, {headers: authenticationHeader()}).then(response => response.data);
    }

    disapproveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/disapprove", {}, {headers: authenticationHeader()}).then(response => response.data);
    }

}


export let adminService = new AdminService();