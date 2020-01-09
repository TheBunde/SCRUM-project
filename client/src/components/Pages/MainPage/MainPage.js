import React, {Component} from 'react'; 
import "../../../css/MainPage.css"
import { createHashHistory } from 'history';

import {NavbarMainPage} from '../../Navbar/Navbar.js'
import Footer from "../../Footer/Footer";

const history = createHashHistory();



class MainPage extends Component{
    
    render() {
        return (
            <div>

                <body  id="MainPageBody" background="mainPageBackground.jpg">
                    <div id="MainPageDiv">
                        <h1 id="MainPageTitle"> Harmoni </h1>
                        <div id="MainPageBtnDiv">
                            <button id="MainPageButtons" type="button" className="btn btn-outline-light btn-lg mr-5" onClick={this.logIn}>Logg inn</button>
                            <button id="MainPageButtons" type="button" className="btn btn-outline-light btn-lg" onClick={this.register}>Register</button>
                        </div>
                    </div>
                </body>
            </div>
        );
    }

    logIn(){
        history.push("/login")
    }

    register(){
        history.push("/register")
    }

}

export default MainPage;