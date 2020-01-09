import React, { Component } from 'react';
import '../../css/About.css';

import Navbar from '../Navbar/Navbar.js';
import Logo from '../../img/Logo1.png'
import {NavbarMainPage} from "../Navbar/Navbar";

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
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/overview"}>Logg inn</button>
                        </div>
                        <div id="AboutButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/overview"}>Registrer ny bruker</button>
                        </div> 
                    </div>          
                </div>
            </div>
        )
    }
}

export default About;
