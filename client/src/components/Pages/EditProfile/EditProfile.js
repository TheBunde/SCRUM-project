import React, {Component} from 'react';
import "../../../css/EditProfile.css"
import { createHashHistory } from 'history';



import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();

class EditProfile extends Component{
    name = "Grete";
    tlf = 12345678;
    email = "grete@ntnu.no";
    newPassword = null;
    oldPassword = null;

    render(){
        return(
            <div>
                <Navbar/>
                <Back/>
                <div id="EditProfileDiv">
                    <h1>Endre Profil</h1>

                    <div id="EditProfileInput">
                        <div className="col-sm-4">
                            <h5>Brukernavn: </h5>
                            <input
                                id="nameInput"
                                className="form-control form-control-lg"
                                type="text"
                                defaultValue={this.name}
                                aria-describedby="namehelp"
                            />
                            <br/>
                        </div>

                        <div className="col-sm-4">
                            <h5>tlf: </h5>
                            <input
                                id="tlfInput"
                                className="form-control form-control-lg"
                                type="text"
                                defaultValue={this.tlf}
                                aria-describedby="tlfhelp"
                            />
                            <br/>
                        </div>


                        <div className="col-sm-4">
                            <h5>E-post: </h5>
                            <input
                                id="emailInput"
                                className="form-control form-control-lg"
                                type="text"
                                defaultValue={this.email}
                                aria-describedby="emailhelp"
                            />
                            <br/>
                        </div>
                    </div>


                    <div id="EditProfileChangePasswordDiv">
                        <p>
                            <button
                                className="btn changePassword btn-outline-info"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapsechangePassword"
                                aria-expanded="false"
                                aria-controls="collapsechangePassword"
                            >
                                Endre passord
                            </button>
                        </p>
                        <div className="collapse" id="collapsechangePassword">

                            <div className="col-sm-4">
                                <h5>Nytt passord: </h5>
                                <input
                                    id="newPasswordInput"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Nytt passord"
                                    aria-describedby="titleHelp"
                                />
                                <br/>
                            </div>

                            <div className="col-sm-4">
                                <h5>Gammelt passord: </h5>
                                <input
                                    id="oldPasswordInput"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Gammelt passord"
                                    aria-describedby="titleHelp"
                                />
                                <br/>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-dark btn-lg" onClick={this.save}>Lagre endringer</button>

                </div>
            </div>

        )
    }

    save(){
        let name = document.getElementById("nameInput").value;
        let tlf = document.getElementById("tlfInput").value;
        let email = document.getElementById("emailInput").value;
        let newPassword = document.getElementById("newPasswordInput").value;
        let oldPassword = document.getElementById("oldPasswordInput").value;


        if(oldPassword === ""){
            oldPassword = null;
        }
        if(newPassword === ""){
            newPassword = null;
        }
        if(oldPassword !== null && newPassword !== null){
            console.log("Se her Helene")
        }

        if(oldPassword !== null && newPassword === null || oldPassword === null && newPassword !== null){
            console.log("mangler å legge inn noe")
        }

        console.log(name);
        console.log(tlf);
        console.log(email);
        console.log(newPassword);
        console.log(oldPassword);


    }
}

export default EditProfile;