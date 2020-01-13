import React, { Component } from 'react';
import '../../../css/MainPage.css'

import Navbar from '../../Navbar/Navbar.js';
import {NavbarMainPage} from "../../Navbar/Navbar";
import {FooterTransparent} from '../../Footer/Footer'

class About extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <div id="AboutDiv">
                    <div id="AboutTitle"><a>HARMONI</a></div>
                    <div id="AboutText"><h4>En portal for informasjonsflyt under planlegging av arrangementer</h4></div>
                    <div id="AboutButtonDiv">
                        <div id="AboutButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/login"}>Logg inn</button>
                        </div>
                        <div id="AboutButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/register"}>Registrer ny bruker</button>
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

export default About;
