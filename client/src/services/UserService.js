import Axios from "axios";
//Axios.interceptors.response.use(response => response.data);

export class User {
    user_id;
    name;
    email;
    phone;
    password;
    approved;
    roleid;

    constructor(user_id, name, email, phone, password,roleId, approved) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.roleid = roleId;
        this.approved = approved;
    }


}

export class UserService {
    registerUser(user) {
        return Axios.post("http://localhost:8080/user", user);
    }

    validate(email, pw){
        return Axios.get("http://localhost:8080/user", email, pw);
    }

    getHashAndSalt(email) {
        return Axios.get("http://localhost:8080/validate/" + email);
    }
}


export default UserService;