import React, {Component} from 'react';
import "../../../css/ShowProfile.css"
import { createHashHistory } from 'history';

import {NavbarMainPage} from '../../Navbar/Navbar.js'
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();

class ShowProfile extends Component{
    name = "Grete";
    tlf = 12345678;
    email = "grete@ntnu.no";


    render(){
        return(
            <div>
                <Navbar/>
                <Back/>
                <div id="ShowProfileDiv">
                    <h1>Min profil</h1>
                    <div id="ShowProfileText">
                        <h4>Brukernavn: {this.name}</h4>
                        <h4>telf: {this.tlf}</h4>
                        <h4>E-mail: {this.email}</h4>
                    </div>

                    <div id="ShowProfileButtonDiv">
                        <div id="ShowProfileBtn">
                            <button type="button" className="btn btn-info btn-lg" onClick={this.editProfile}>Endre profil</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    editProfile(){
        history.push("/profile/user/edit")
    }

}

export default ShowProfile;