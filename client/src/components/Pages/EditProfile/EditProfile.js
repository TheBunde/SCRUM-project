import React, {Component} from 'react';
import "../../../css/EditProfile.css"
import { createHashHistory } from 'history';
import {profileService} from '../../../service/ProfileService'



import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();

//export class User{
class User{
    user_id;
    name;
    tlf;
    email;

    constructor(user_id, name, tlf, email) {
        this.user_id = user_id;
        this.name = name;
        this.tlf = tlf;
        this.email = email;
    }

}

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {user : {}}
    }
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
                                    aria-describedby="newPasHelp"
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
                                    aria-describedby="oldPasHelp"
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



    componentDidMount(){
        let testUser = new User(1, "Grethe", "12345678", "grethe@ntnu.no");
        this.setState({user : testUser});
        console.log(this.state.user)
    }

    save = (e) => {

        let newUser = new User(
            this.state.user.user_id,
            document.getElementById("nameInput").value,
            document.getElementById("tlfInput").value,
            document.getElementById("emailInput").value
        );


        let newName = document.getElementById("nameInput").value;
        let newTlf = document.getElementById("tlfInput").value;
        let newEmail = document.getElementById("emailInput").value;
        let newPassword = document.getElementById("newPasswordInput").value;
        let oldPassword = document.getElementById("oldPasswordInput").value;

        console.log(this.state.user);
        this.setState({user: newUser});
        console.log(newUser);




        if(oldPassword === ""){
            oldPassword = null;
        }
        if(newPassword === ""){
            newPassword = null;
        }

        if(oldPassword !== null && newPassword === null || oldPassword === null && newPassword !== null){
            console.log("mangler å legge inn noe")
        }else if(newName === "" || newTlf === "" || newEmail === ""){
            console.log("Ikke gi tomme feilter");
        }else{
            if(oldPassword !== null && newPassword !== null){
                console.log("vi ønsker å endre passord ")
            }

            profileService.updateUser(newUser).catch(e => console.error(e));
        }


        console.log(newPassword);
        console.log(oldPassword);


    }
}

export default EditProfile;