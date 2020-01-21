import axios from 'axios';
import {User} from "../service/UserService";
import {authenticationHeader} from "./UserService";

let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

export class ProfileService{

    updateUser(user){
        return axios.put("http://" + ipAdress + ":8080/profile/" + user.user_id + '/edit', user, {headers: authenticationHeader()});
    }

    getUser(userID){
        return axios.get("http://" + ipAdress + ":8080/user/" + userID, {headers: authenticationHeader()}).then(response => {
            let a = response.data[0];
            console.log(a);
            return new User(
                a.user_id,
                a.name,
                a.email,
                a.phone,
                a.profile_photo,
                a.password,
                a.roleid,
                a.approved
            );

        }).catch(error => console.log(error));
    }


}

export default ProfileService;

