import axios from 'axios';


class AdminService{

    getUser(userID){
        return axios.get("http://localhost:8080/user/" + userID).then(response => response.data);
    }

    getUsers(){
        return axios.get("http://localhost:8080/users/").then(response => response.data);
    }

    assignRole(userID, roleID){
        return axios.post("http://localhost:8080/users/:" + userID + "/role/", roleID).then(response => response.data);
    }

    deleteUser(userID){
        return axios.delete("http://localhost:8080/users/:" + userID).then(response => response.data);
    }

}


export let adminService = new AdminService();
