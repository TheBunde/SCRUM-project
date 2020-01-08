import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import LoginForm from "../../LoginForm/LoginForm"

class LoginPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;