import React, {Component} from 'react';

import LoginForm from "../../LoginForm/LoginForm"
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import { auth } from "../../../service/UserService.js" 
import {Redirect} from 'react-router-dom';


class LoginPage extends Component{
    
    render() {
        return (
            auth.authenticated === true
                ? <Redirect to="/overview" /> // Redirecting to overview page if user already is logged in.
                :   
                <div class="pageSetup">
                    <NavbarMainPage/>
                    <LoginForm />
                    <Footer />
                </div>
        );
    }
}

export default LoginPage;