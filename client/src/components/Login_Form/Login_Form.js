import React, {Component} from 'react';
import "../../css/Login_Form.css";

class Login_Form extends Component{

    render(){
        return(
            <form>
                <h1 id="login-title">Innlogging</h1>
                <div class="form-group" id="email-input-container">
                    <label for="email-input">E-post adresse</label>
                    <input type="email" class="form-control" id="email-input" placeholder="Skriv inn e-post" />
                </div>
                <div class="form-group" id="password-input-container">
                    <label for="password-input">Passord</label>
                    <input type="password" class="form-control" id="password-input" placeholder="Skriv inn passord" />
                </div>
                <button type="button" class="btn btn-primary" id="login-button">Logg inn</button>
            </form>
        )
    }
}

export default Login_Form;