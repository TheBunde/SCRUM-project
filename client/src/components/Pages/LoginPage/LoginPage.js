import React, {Component} from 'react';

import '../../../css/LoginPage.css'
import LoginForm from "../../LoginForm/LoginForm"
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FooterTransparent} from '../../Footer/Footer'

class LoginPage extends Component{
    
    render() {
        return (
            <div class="pageSetup">
                <div id="LoginFormDiv">
                    <div id="MainPageTitle"><a id="LoginPageTitle" href="">HARMONI</a></div>
                        <LoginForm />
                    <div>
                        <FooterTransparent />
                    </div>    
                </div>
            </div>
            
        );
    }
}

export default LoginPage;

/* <LoginForm />*/