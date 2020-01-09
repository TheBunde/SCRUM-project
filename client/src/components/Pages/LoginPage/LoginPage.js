import React, {Component} from 'react';

import LoginForm from "../../LoginForm/LoginForm"
import {NavbarMainPage} from '../../Navbar/Navbar'

class LoginPage extends Component{
    
    render() {
        return (
            <div>
                <NavbarMainPage/>
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;