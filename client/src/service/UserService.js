import Axios from "axios";
import {authenticationHeader} from "./auth";
//Axios.interceptors.response.use(response => response.data);
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


/**
 * User
 */
export class User {
    user_id;
    name;
    email;
    phone;
    profile_photo;
    password;
    roleid;
    approved;
    /**
     * 
     * @param {number} user_id 
     * @param {string} name 
     * @param {string} email 
     * @param {string} phone 
     * @param {File} profile_photo 
     * @param {string} password 
     * @param {number} roleId 
     * @param {boolean} approved 
     */
    constructor(user_id, name, email, phone, profile_photo, password,roleId, approved) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.profile_photo = profile_photo;
        this.password = password;
        this.roleid = roleId;
        this.approved = approved;
    }
}

//Credit user imgx64 from StackOverflow || https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
let parseJwt =  (token) => {
    if(token !== null && typeof token !== "undefined"){
        let base64Url = token.split('.')[1];
        if (base64Url === undefined) { //The token will not be valid format and is therefore automatically rejected
            return null;
        }
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else{
        return null;
    }
};

export let authenticationHeader = function authenticationHeader() {
    let token = window.localStorage.getItem("token");

    if (token) {
        return {Authorization : "Bearer " + token}
    } else return {}
};

export const auth = {
    authenticated: false,
    role: "",
    user_id : "",
    authenticate(){
        let response = parseJwt(localStorage.getItem("token"));
        if(response !== null && response.role !== undefined){
            this.authenticated = true;
            this.role = response.role.slice(1, response.role.length-1);
            this.user_id = response.user_id;
        } else{
            this.authenticated = false;
            this.role = "";
        }
    }
};

export let authenticate = auth.authenticate.bind(auth);


/**
 * User service
 */
export class UserService {
    /**
     * 
     * @param {user} user 
     */
    registerUser(user){
        return Axios.post("http://" + ipAdress + ":8080/user", user);
    }
    /**
     * 
     * @param {string} email 
     * @param {string} pw 
     */
    validate(email, pw){
        return Axios.post("http://" + ipAdress + ":8080/validate", {"email":  email, "password" : pw});
    }
    /**
     * 
     * @param {string} email 
     */
    getHash(email) {
        return Axios.get("http://" + ipAdress + ":8080/validate/" + email);
    }
    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newPassword 
     * @param {number} user_id 
     */
    updatePassword(email, password, newPassword, user_id){
        console.log("User service: " + email);
        return Axios.put("http://" + ipAdress + ":8080/user/" + user_id + "/edit/password",
            {
                "email": email,
                "password": password,
                "newPassword": newPassword
            }, {headers: authenticationHeader()}
        );
    }
    /**
     * 
     * @param {string} email 
     */
    forgotPassword(email) {
        return Axios.post("http://" + ipAdress + ":8080/user/reset_password",
            {
                "email" : email
            }
        )
    }

    /**
     * 
     * @param {user} user 
     */
    updateUser(user){
        return Axios.put("http://" + ipAdress + ":8080/profile/" + user.user_id + '/edit', user, {headers: authenticationHeader()});
    }
    /**
     * 
     * @param {number} userID 
     */
    getUser(userID){
        return Axios.get("http://" + ipAdress + ":8080/user/" + userID, {headers: authenticationHeader()}).then(response => {
            let a = response.data[0];
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

export default UserService;