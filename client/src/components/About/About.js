import React, { Component } from 'react';
import '../../css/About.css';

import Navbar from '../Navbar/Navbar.js';
import Logo from '../../img/Logo1.png'
import {NavbarMainPage} from "../Navbar/Navbar";

class About extends Component {
  render() {  
    return (
        <div>
            <NavbarMainPage/>

            <div id="AboutDiv">
                <div id="AboutTitle"><img src={Logo} width="300" /></div>
                <div id="AboutText"><h4>En portal for god informasjonsflyt under arrangementplanlegging</h4></div>
                <div id="AboutButtonDiv">
                    <div id="AboutButtons">
                        <button type="button" className="btn btn-outline-light btn-lg">Logg inn</button>
                    </div>
                    <div id="AboutButtons">
                        <button type="button" className="btn btn-outline-light btn-lg">Registrer ny bruker</button>
                    </div> 
                </div>  
            </div>
        </div>
    )
  }
}

export default About;