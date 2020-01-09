import axios from 'axios';

class adminService{

    getUsers(){
        return axios.get("http://localhost:8080/users/").then(response => response.data);
    }
}