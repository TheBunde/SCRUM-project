import React, {Component} from 'react';

import LoginForm from "../../LoginForm/LoginForm"
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'

class LoginPage extends Component{
    
    render() {
        return (
            <div class="pageSetup">
            <NavbarMainPage/>
            <LoginForm />
            <Footer />
            </div>
            
        );
    }
}

export default LoginPage;