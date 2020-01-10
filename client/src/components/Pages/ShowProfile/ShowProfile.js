import React, {Component} from 'react';
import "../../../css/ShowProfile.css"
import { createHashHistory } from 'history';
import { User} from "../EditProfile/EditProfile";

import {NavbarMainPage} from '../../Navbar/Navbar.js'
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();

class ShowProfile extends Component{
    user = new User(1, "Grete", "09876543", "grete@ntnu.no");
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
                        <h4>Brukernavn: {this.user.name}</h4>
                        <h4>tlf: {this.user.tlf}</h4>
                        <h4>E-mail: {this.user.email}</h4>
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