import axios from 'axios';
import {User} from "../service/UserService";
//let ipAdress = "10.24.3.122";
//let ipAdress = "localhost";
let ipAdress = "10.22.2.85";

export class ProfileService{

    updateUser(user){
        console.log("It is fixed");
        return axios.put("http://" + ipAdress + ":8080/profile/" + user.user_id + '/edit', user);
    }

    getUser(userID){
        return axios.get("http://" + ipAdress + ":8080/user/" + userID).then(response => {
            let a = response.data[0];
            console.log(a);
            return new User(
                a.user_id,
                a.name,
                a.email,
                a.phone,
                a.password,
                a.roleid,
                a.approved,
            );

        }).catch(error => console.log(error));
    }


}

export default ProfileService;

