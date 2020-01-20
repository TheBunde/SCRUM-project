import React, {Component} from 'react';
import "../../../css/EditProfile.css"
import { createHashHistory } from 'history';
import {ProfileService} from '../../../service/ProfileService'
import {FileService} from "../../../service/FileService";
import {User, UserService} from "../../../service/UserService";
import {Redirect} from 'react-router-dom';
import {auth, authenticate} from "../../../service/UserService";
import {toast} from 'react-toastify';
import {validateEmail, validatePhone} from "../../../validaters";


import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";
import Footer from "../../Footer/Footer";

const history = createHashHistory();


class EditProfile extends Component{
    user_id = this.props.match.params.userID;
    user;

    constructor(props) {
        super(props);
        this.state = {user : {}, img_url : ""}

    }

    notifySuccess = () => {
        toast("Redigering av bruker vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifySuccessPw = () => {
        toast("Redigering av e-post vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyUnvalidPhone = () => toast("Ugyldig telefonnummer", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyUnvalidEmail = () => toast("Ugyldig e-post", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});


    componentDidMount() {
        authenticate();
        if (this.props.match.params.userID === auth.user_id) {
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
        }
    };


    checkFields = (e) => {
        // If any of these fields are empty, the function returns false, and prompts the user to fill the remaining fields.
        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const phone = document.getElementById("tlfInput").value.trim();
        const pw = this.state.user.password;
        const role = this.state.user.roleid;
        const approved = this.state.user.approved
        console.log(name, email, phone, pw, role, approved);

        console.log(name === "");

        if(
            (name === null || name === "" ||
            email === null || email === "" ||
            phone === null || phone === "" ||
            pw === null || pw === "" ||
            role === null || role === "" ||
            approved === null || approved === "")
        ){
            this.notifyFailure();
            return false;
        } else if (!(validatePhone(phone))) {
            this.notifyUnvalidPhone();
            return false;
        } else if (!(validateEmail(email))) {
            this.notifyUnvalidEmail();
            return false;
        }
        else{
            return true;
        }
    };

    render(){
        return(
            auth.user_id === this.props.match.params.userID ?
            <div>
                <Navbar/>
                <div id="EditProfileDiv">
                    <h1>Endre Profil</h1>
                    <div id="ShowProfileDivide" className="dropdown-divider border-dark"></div>

                    <div id="EditProfileInput">
                        <div className="col-sm-4">
                            <h5>Navn: </h5>
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
                            <h5>Telefon: </h5>
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
                        <div className="col-sm-4">
                            <h5>Profilbilde: </h5>
                            <input
                                id="fileInput"
                                className="form-control form-control-lg"
                                type="file" accept={"image/*"}
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
                                <h5>Gammelt passord: </h5>
                                <input
                                    id="oldPasswordInput"
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Gammelt passord"
                                    aria-describedby="oldPasHelp"
                                />
                                <br/>
                            </div>

                            <div className="col-sm-4">
                                <h5>Nytt passord: </h5>
                                <input
                                    id="newPasswordInput"
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Nytt passord"
                                    aria-describedby="newPasHelp"
                                />
                                <br/>
                            </div>

                            <div className="col-sm-4">
                                <button type="button" className="btn btn-primary" onClick={this.changePW}>Endre passord</button>
                                <br/>
                            </div>

                        </div>
                    </div>

                    <button type="button" className="btn btn-dark btn-lg" onClick={this.save}>Lagre endringer</button>

                </div>
                <Footer/>
            </div>
                : <Redirect to={"/profile/" + auth.user_id} />

        )
    }

    changePW = (e) => {
        console.log("aaaaaaaa");
        let userService = new UserService();

        const email = this.state.user.email;
        const user_id = auth.user_id;
        const oldPWInput = document.getElementById("oldPasswordInput").value;
        const newPWInput = document.getElementById("newPasswordInput").value;

        if( // If any of the fields are empty, prompt the user to fill them in before proceeding
            oldPWInput === null || oldPWInput === "",
            newPWInput === null || newPWInput === ""
        ){
            console.log("Du må fylle ut feltene!")
            return false;
        } else{
            userService.updatePassword(email, oldPWInput, newPWInput, user_id)
                .then(() => {
                    this.notifySuccessPw();
                    window.location.hash="/profile/" + auth.user_id;
                })
                .catch((err) => {
                    this.notifyFailure();
                })
        }
    }

    save = (e) => {
        if(this.checkFields()) { // Check if any input-fields are empty
            let fileService = new FileService();
            let file = document.getElementById(("fileInput")).files[0];
            console.log(file);

            fileService.uploadImage(file)
                .then((res) => {
                    this.setState({
                        img_url : res.data.filePath.filename
                    })
                })
                .catch((err) => {
                    console.error(err);
                })
                .then(() => {
                    let profileService = new ProfileService();
                    let newUser = new User(
                        this.state.user.user_id,
                        document.getElementById("nameInput").value,
                        document.getElementById("emailInput").value,
                        document.getElementById("tlfInput").value,
                        this.state.img_url,
                        this.state.user.password,
                        this.state.user.roleid,
                        this.state.user.approved
                    );
                    console.log(newUser);
                    profileService.updateUser(newUser)
                        .then (() => {
                            this.notifySuccess();
                            window.location.hash = "/profile/" + auth.user_id;
                        })
                        .catch((err) => {
                            this.notifyFailure();
                        })
                })
        }



        /*
        if(this.checkFields()){ // Check if any input-fields are empty
            let profileService = new ProfileService();
            let newUser = new User(
            this.state.user.user_id,
            document.getElementById("nameInput").value,
            document.getElementById("emailInput").value,
            document.getElementById("tlfInput").value,
            this.state.user.password,
            this.state.user.roleid,
            this.state.user.approved
        );
            console.log(user);
            profileService.updateUser(user);
        }
        */
        /*let newUser = new User(
            this.state.user.user_id,
            document.getElementById("nameInput").value,
            document.getElementById("emailInput").value,
            document.getElementById("tlfInput").value,
            this.state.user.password,
            this.state.user.roleid,
            this.state.user.approved
        );*/
        /*
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
        }else if(newName === "" || newTlf === "" || newEmail === ""){
            console.log("Ikke gi tomme feilter");
        }else{
            if(oldPassword !== null && newPassword !== null){
                console.log("vi ønsker å endre passord ");
                /*
                Her ønsker vi å først sjekke om det gamle passordet stemmer med det som ligger i databasen
                dersom det stemmer skal det nye passordet erstattes med det gamle. dersom passordet ikke stemmer skal check settes til false
                 */
                //check = false; //if the password doesn't pass the test;
            /*}
            if(check){
                console.log("Alt ok");
                profileService.updateUser(newUser).catch(e => console.error(e));
            }

        }


        console.log(newPassword);
        console.log(oldPassword);*/


    }
}

export default EditProfile;
