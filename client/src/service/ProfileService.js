import axios from 'axios';
import {User} from "../services/UserService";


export class ProfileService{

    updateUser(user){
        console.log("It is fixed");
        return axios.put('http://localhost:8080/profile/' + user.user_id + '/edit', user);
    }

    getUser(userID){
        return axios.get("http://localhost:8080/user/" + userID).then(response => {
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

