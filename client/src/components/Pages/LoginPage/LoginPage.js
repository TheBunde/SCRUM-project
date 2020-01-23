import React, {Component} from 'react';

import '../../../css/LoginPage.css'
import LoginForm from "../../LoginForm/LoginForm"
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FooterTransparent} from '../../Footer/Footer'
import { auth } from "../../../service/auth.js"
import {Redirect} from 'react-router-dom';


class LoginPage extends Component{
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div class="pageSetup">
                <div id="LoginFormDiv">
                    <div id="LoginFormWithoutFooter">
                        <div id="MainPageTitle"><a id="LoginPageTitle" href="#/portal">HARMONI</a></div>
                        <LoginForm />
                    </div>
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