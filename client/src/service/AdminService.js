import axios from 'axios';

export class AdminService{
    getUsers(){
        return axios.get("http://localhost:8080/users/").then(response => response.data);
    }
}

export default AdminService;