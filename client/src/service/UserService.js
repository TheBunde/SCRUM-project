import Axios from "axios";
//Axios.interceptors.response.use(response => response.data);
//let ipAdress = "10.24.3.122";
let ipAdress = "localhost";
//let ipAdress = "10.22.2.85";

export class User {
    user_id;
    name;
    email;
    phone;
    password;
    roleid;
    approved;

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

let parseJwt =  (token) => {
    if(token !== null && typeof token !== "undefined"){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else{
        return null;
    }
};

let authenticationHeader = function authenticationHeader() {
    console.log("yeeeee");
    let token = window.localStorage.getItem("token");

    if (token) {
        return {"authorization": "Bearer " + token}
    } else return {}
};

export const auth = {
    authenticated: false,
    role: "",
    user_id : "",
    authenticate(){
        let response = parseJwt(localStorage.getItem("token"));
        console.log(response);
        if(response !== null){
            this.authenticated = true;
            this.role = response.role.slice(1, response.role.length-1);
            this.user_id = response.user_id;
        } else{
            this.authenticated = false;
            this.role = "";
        }
    }
};

export let authConfig = authenticationHeader;


export let authenticate = auth.authenticate.bind(auth);
export class UserService {

    registerUser(user) {
        return Axios.post("http://" + ipAdress + ":8080/user", user);
    }

    validate(email, pw){
        console.log("oui")
        return Axios.post("http://" + ipAdress + ":8080/validate", {"email":  email, "password" : pw});
    }

    getHash(email) {
        console.log("Very cool")
        return Axios.get("http://" + ipAdress + ":8080/validate/" + email);
    }

    updatePassword(email, password, newPassword, user_id){
        console.log("User service: " + email);
        let obj = authConfig;
        obj["email"] = email;
        obj["password"] = password;
        obj["newPassword"] = newPassword;

        return Axios.put("http://" + ipAdress + ":8080/user/" + user_id + "/edit/password", obj);
    }

    updateUser(user){
        console.log("It is fixed");
        let obj = authConfig;
        obj["user"] = user;
        return Axios.put("http://" + ipAdress + ":8080/profile/" + user.user_id + '/edit', obj);
    }

    getUser(userID){
        console.log("hoi sjef")
        return Axios.get("http://" + ipAdress + ":8080/user/" + userID, {headers: {authorization: "Bearer " + window.localStorage.getItem("token")}}).then(response => {
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

export default UserService;