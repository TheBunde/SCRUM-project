import React, {Component} from 'react';
import "../../css/LoginForm.css";
import UserService from "../../services/UserService.js"
import {User} from "../../services/UserService";
let crypto = require('crypto');

export const auth = {
    authenticated: false,
    authenticate(callback){
        this.authenticated = true;
        setTimeout(callback, 100);
    },
    signout(callback){
        this.authenticated = false;
        setTimeout(callback, 100)
    }
};

/*class LoginForm extends Component<{props: submit}>{
const jwt =  require('jsonwebtoken');
//const private_key = 'pizza1234';*/

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pw: "",
        }
    }


    // Submitting the values in state to a validate function to check if email/pw are valid.
    // If so, send the user to the home page/overview page.
    submit = (e) => {
        let userService = new UserService();
        console.log(this.state.email);
        userService.getHashAndSalt(this.state.email)
            .then((hashAndSalt) => {
                /*
                console.log(hashAndSalt.data[0]);
                console.log(this.sha512(this.state.pw, hashAndSalt.data[0].salt));
                if (this.sha512(this.state.pw, hashAndSalt.data[0].salt).passwordHash == hashAndSalt.data[0].password_hash) {
                    let token = jwt.sign({ email: this.state.email }, privateKey, {
                        expiresIn: 360
                    });
                    console.log(token);

                }

                 */


            })
            .catch((error) => {
                console.error(error);
            });
        /*if(UserService.validate(this.state.email, this.state.pw)){

        }*/
    };

    sha512 = (password, salt) => {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };

    // Runs every time input-fields are updated. Updates the state with the most current values.
    updateInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
        console.log(this.state.pw);
    }

    render(){
        
        return(
            <form>
                <h1 id="login-title">Innlogging</h1>
                <div class="form-group" id="email-input-container">
                    <label for="email-input">E-post adresse</label>
                    <input type="email" class="form-control" id="email-input" placeholder="Skriv inn e-post" name="email" onChange={this.updateInputValue} />
                </div>
                <div class="form-group" id="password-input-container">
                    <label for="password-input">Passord</label>
                    <input type="password" class="form-control" id="password-input" placeholder="Skriv inn passord" name="pw" onChange={this.updateInputValue} />
                </div>
                <button type="button" class="btn btn-primary" id="login-button" onClick={this.submit}>Logg inn</button>
            </form>
        )
    }
}

export default LoginForm;