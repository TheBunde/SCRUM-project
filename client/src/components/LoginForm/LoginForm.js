import React, {Component} from 'react';
import "../../css/LoginForm.css";
import UserService from "../../service/UserService.js"
import {authenticate} from "../../service/UserService";
import {NavbarMainPage} from '../Navbar/Navbar.js'
import {toast} from "react-toastify";

let crypto = require('crypto');

/*
 * @class LoginForm
 */
class LoginForm extends Component{
    /**
     * 
     * @param {json} props 
     */
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pw: "",
        }
        this.keyPressed = this.keyPressed.bind(this);
    }

    notifyFailure = () => toast("E-post/passord var feil eller så er bruker ikke godkjent", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});



    /**
     * Submitting the values in state to a validate function to check if email/pw are valid.
     * If so, send the user to the home page/overview page.
     */
    submit = () => {
        let userService = new UserService();
        console.log(this.state.email);
        userService.validate(this.state.email, this.state.pw)
            .then((response) => {
                console.log("Gikk");
                console.log("jwt:" + response.data.jwt);

                let token = response.data.jwt;
                window.localStorage.setItem("token", token);
                window.location.hash = "/overview";
            })
            .then(authenticate)
            .catch((err) => {
                this.clearPassword();
                this.notifyFailure();
                console.error(err);
            })

    };

    /** Runs every time input-fields are updated. Updates the state with the most current values. */
    updateInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    clearPassword = () => {
        document.getElementById("password-input").value = "";
    }

    keyPressed(event){
        if (event.key === "Enter") {
            this.submit();
        }
    }

    render(){        
        return(
            <div>
                <form id="LoginFormForm">
                    <div class="card LoginFormCard">
                        <div class="card-body">
                            <h1 id="login-title">Logg inn</h1>
                            <div class="form-group" id="email-input-container">
                                <label for="email-input">E-post</label>
                                <input type="email" name={"email"} className="form-control" id="email-input" placeholder="Skriv inn e-post" name="email" onChange={this.updateInputValue} onKeyPress={this.keyPressed}/>
                            </div>
                            <div class="form-group" id="password-input-container">
                                <label for="password-input">Passord</label>
                                <input type="password" class="form-control" id="password-input" placeholder="Skriv inn passord" onKeyPress={this.keyPressed} name="pw" onChange={this.updateInputValue} />
                            </div>
                            <div id="LoginFormButtons">
                                <button type="button" class="btn btn-outline-dark" id="login-button" onClick={this.submit}>Logg inn</button>
                                <button type="button" class="btn btn-outline-dark" id="login-button" onClick={() => window.location.href="#/register"}>Register</button>
                            </div>
                            <div id="loginFormForgotPW">
                                <a href="#/forgotpassword">Glemt passord?</a>
                            </div>
                            </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;