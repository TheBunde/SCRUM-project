import Axios from "axios";

//Axios.interceptors.response.use(response => response.data);
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

export class User {
    user_id;
    name;
    email;
    phone;
    profile_photo;
    password;
    roleid;
    approved;

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
    check(){
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
    },

    async authenticate(){
        let userService = new UserService();
        let response = parseJwt(localStorage.getItem("token"));

        if(response !== null){
            let valid = await userService.checkToken();
            if(valid){
                console.log("Is this doing the work?", valid);
                this.authenticated = true;
                this.role = response.role.slice(1, response.role.length-1);
                this.user_id = response.user_id;
                return true;
            } else{
                this.authenticated = false;
                this.role = "";
                this.user_id = -1
                return false;
            }
        }
    }
};

//export let uthenticate = auth.checkToken.bind(auth)
export let authenticate = auth.authenticate.bind(auth);
export class UserService {
    registerUser(user){
        return Axios.post("http://" + ipAdress + ":8080/user", user);
    }

    validate(email, pw){
        return Axios.post("http://" + ipAdress + ":8080/validate", {"email":  email, "password" : pw});
    }

    getHash(email) {
        return Axios.get("http://" + ipAdress + ":8080/validate/" + email);
    }

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

    forgotPassword(email) {
        return Axios.post("http://" + ipAdress + ":8080/user/reset_password",
            {
                "email" : email
            }
            )
    }

    checkToken(){
        console.log("ouioui")
        return Axios.get("http://" + ipAdress + ":8080/token/check", {headers: authenticationHeader()}).then(res => {
            console.log("Valid?", res.data.valid);
            return res.data.valid;
        })
    }
}

export default UserService;