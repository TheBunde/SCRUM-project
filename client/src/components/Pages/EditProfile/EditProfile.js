import React, {Component} from 'react';
import "../../../css/EditProfile.css"
import { createHashHistory } from 'history';
import {ProfileService} from '../../../service/ProfileService'
import {User} from "../../../services/UserService";


import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();


class EditProfile extends Component{
    user_id = this.props.match.params.userID;
    user;

    constructor(props) {
        super(props);
        this.state = {user : {}}

    }

    componentDidMount() {
        let profileService = new ProfileService();
        profileService.getUser(this.user_id)
            .then(user =>
                this.setState({
                    user: user
                })

            )
            .catch((error) => {
                console.error(error);
            });
        console.log("SE ME " + this.state.user)
    };

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
                            defaultValue={this.state.user.name}
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
                            defaultValue={this.state.user.phone}
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
                            defaultValue={this.state.user.email}
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


save = (e) => {

    let newUser = new User(
        this.state.user.user_id,
        document.getElementById("nameInput").value,
        document.getElementById("emailInput").value,
        document.getElementById("tlfInput").value,
        this.state.user.password,
        this.state.user.roleid,
        this.state.user.approved
    );

    let newName = document.getElementById("nameInput").value;
    let newTlf = document.getElementById("tlfInput").value;
    let newEmail = document.getElementById("emailInput").value;
    let newPassword = document.getElementById("newPasswordInput").value;
    let oldPassword = document.getElementById("oldPasswordInput").value;


    console.log(this.state.user);
    this.setState({user: newUser});
    console.log(newUser);
    let check = true;


    let profileService = new ProfileService();
    if(oldPassword === ""){
        oldPassword = null;
    }
    if(newPassword === ""){
        newPassword = null;
    }

    if(oldPassword !== null && newPassword === null || oldPassword === null && newPassword !== null){
        console.log("mangler å legge inn noe");
        check = false;
    }else if(newName === "" || newTlf === "" || newEmail === ""){
        console.log("Ikke gi tomme feilter");
        check = false;
    }else{
        if(oldPassword !== null && newPassword !== null){
            console.log("vi ønsker å endre passord ");
            check = true; //if the password passes the test;
        }
        if(check){
            console.log("Alt ok");
            profileService.updateUser(newUser).catch(e => console.error(e));
        }

    }


    console.log(newPassword);
    console.log(oldPassword);


}
}

export default EditProfile;