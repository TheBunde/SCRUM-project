import axios from 'axios';
let ipAdress = "localhost";


class AdminService{

    updateName(name, userID){
        return axios.put("http://localhost:8080/users/" + userID + "/newName", {name: name}).then(response => response.data);
    }

    updatePhone(phone, userID){
        return axios.put("http://localhost:8080/users/" + userID + "/newPhone", {phone: phone}).then(response => response.data);
    }

    updateEmail(email, userID){
        return axios.put("http://localhost:8080/users/" + userID + "/newEmail", {email: email}).then(response => response.data);
    }

    getRoles(){
        return axios.get("http://" + ipAdress + ":8080/roles").then(response => response.data);
    }

    getRoleByID(roleID){
        return axios.get("http://" + ipAdress + ":8080/role/" + roleID).then(response => response.data);
    }

    getRole(role){
        return axios.get("http://" + ipAdress + ":8080/roles/" + role).then(response => response.data);
    }

    assignRole(userID, roleID){
        return axios.post("http://" + ipAdress + ":8080/users/" + userID + "/role/", {roleID: roleID}).then(response => response.data);
    }

    getUser(userID){
        return axios.get("http://" + ipAdress + ":8080/user/" + userID).then(response => response.data);
    }

    getUsers(){
        return axios.get("http://" + ipAdress + ":8080/users/").then(response => response.data);
    }

    deleteUser(userID){
        return axios.delete("http://" + ipAdress + ":8080/users/" + userID).then(response => response.data);
    }

    approveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/approve").then(response => response.data);
    }

    disapproveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/disapprove").then(response => response.data);
    }

}


export let adminService = new AdminService();