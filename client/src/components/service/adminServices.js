import axios from 'axios';

class adminServices{

    getUsers(){
        return axios.get("http://localhost:8080/users/").then(response => response.data);
    }

    approveUser(userID){
        console.log(userID);
        return axios.put("http://localhost:8080/users/:" + userID).then(response => response.data);
    }
}
