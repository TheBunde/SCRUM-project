import React, { Component } from 'react';
import '../../../css/MainPage.css';

import Navbar from '../../Navbar/Navbar.js';
import {NavbarMainPage} from "../../Navbar/Navbar";
import {FooterTransparent} from '../../Footer/Footer'
import { auth } from "../../../service/UserService.js" 
import {Redirect} from 'react-router-dom';

class MainPage extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (

            auth.authenticated === true
                ? <Redirect to="/overview" /> // Redirecting to overview page if user already is logged in.
                : 

            <div>
                <div id="MainPageDiv">
                    <div id="MainPageDivWithoutFooter">
                        <div id="MainPageTitle"><a>HARMONI</a></div>
                        <div id="MainPageText"><h4>En portal for informasjonsflyt under planlegging av arrangementer</h4></div>
                        <div id="MainPageButtonDiv">
                            <div id="MainPageButtons">
                                <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/login"}>Logg inn</button>
                            </div>
                            <div id="MainPageButtons">
                                <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/register"}>Registrer ny bruker</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FooterTransparent />
                    </div>    
                </div>
            </div>
        )
    }
}

export default MainPage;
