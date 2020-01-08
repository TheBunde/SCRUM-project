import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import Login_Form from "../../Login_Form/Login_Form"

class LoginPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />
                <Login_Form />
            </div>
        );
    }
}

export default LoginPage;