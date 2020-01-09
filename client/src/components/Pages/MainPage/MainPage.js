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
<<<<<<< HEAD
                    <h1> Harmoni </h1>
                    <button type="button" className="btn btn-primary">log in</button>

                    <div id="MainPageButtons">
                        <button type="button" className="btn btn-outline-primary btn-lg">Logg inn</button>
                    </div>
                    <div id="MainPageButtons">
                        <button type="button" className="btn btn-outline-secondary btn-lg">Registrer ny bruker</button>
                    </div>
=======
                    <h1 id="MainPageTitle"> Harmoni </h1>
                    <div id="MainPageBtnDiv">
                        <button id="MainPageButtons" type="button" className="btn btn-outline-light btn-lg mr-5" onClick={this.logIn}>Logg inn</button>
                        <button id="MainPageButtons" type="button" className="btn btn-outline-light btn-lg" onClick={this.register}>Register</button>
                    </div>
>>>>>>> 83dd545bf29439749138f40f057a2995cae4392c

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