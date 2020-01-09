import axios from 'axios';


class AdminServices{

    getUsers(){
        return axios.get("http://localhost:8080/users/").then(response => response.data);
    }

    approveUser(userID){
        console.log(userID);
        return axios.put("http://localhost:8080/users/:" + userID).then(response => response.data);
    }

    assignRole(userID, roleID){
        return axios.post("http://localhost:8080/users/:" + userID + "/role/", roleID).then(response => response.data);
    }

    deleteUser(userID){
        return axios.delete("http://localhost:8080/users/:" + userID).then(response => response.data);
    }
}


export default AdminService;
