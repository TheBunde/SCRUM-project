import Axios from "axios";
//Axios.interceptors.response.use(response => response.data);

export class User {
    name;
    email;
    phone;
    password;
    approved;
    roleid;

    constructor(name, email, phone, password, approved, roleId) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.approved = approved;
        this.roleid = roleId;
    }


}

export class UserService {
    registerUser(user) {
        return Axios.post("http://localhost:8080/user", user);
    }

    validate(email, pw){
        return Axios.post("http://localhost:8080/validate", email, pw);
    }

    getHash(email) {
        return Axios.get("http://localhost:8080/validate/" + email);
    }
}


export default UserService;