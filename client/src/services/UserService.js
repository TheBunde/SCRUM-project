import Axios from "axios";
Axios.interceptors.response.use(response => response.data);

export class User {
    name;
    email;
    phone;
    salt;
    password_hash;
    roleId;

    constructor(name, email, phone, salt, password_hash, roleId) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.salt = salt;
        this.password_hash = password_hash;
        this.roleId = roleId;
    }

}

export class UserService {
    registerUser(user) {
        return Axios.post("http://localhost:8080/user", user);
    }

    validate(email, pw){
        return Axios.get("http://localhost:8080/user", email, pw);
    }
}