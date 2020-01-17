import React, {Component} from 'react';

import "../../../css/RegisterPage.css"
import UserService, {User} from "../../../service/UserService.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FooterTransparent} from '../../Footer/Footer'
import {confirmAlert} from "react-confirm-alert";


class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            role: "ingenRolle",
            password: "",
            repeatedPassword: "",
            synligModal: false,
            modalFeedback: "",
            modalTitle: "",
        };
        this.keyPressed = this.keyPressed.bind(this);
        this.regUser = this.regUser.bind(this);
    }
    
    keyPressed(event) {
        if (event.key === "Enter" && (this.state.name !== "" && this.state.email !== "" && this.state.phone !== "" && this.state.password !== "" && this.state.repeatedPassword !== "")) {
            this.regUser();
        }
    }
    
    render() {
        return (
            <div class="pageSetup">
                <div id="LoginFormDiv">
                    <div id="MainPageTitle"><a id="LoginPageTitle" href="">HARMONI</a></div>
                <div className={"wrapper"}> 
                    <div className={"registerContainer"}>
                        <div class="card RegisterPageCard">
                            <div class="card-body">
                                <h1 id={"regTitle"}>Registrer</h1>
                                <form>
                                    <div className="form-group" id="RegisterPageFormGroup">
                                        <div id="RegisterPageFormFieldsDiv">
                                            <label htmlFor="exampleInputEmail1">Navn: </label>
                                            <input type="name" name={"name"} className="form-control" id="firstNameInput"
                                                onChange={this.handleTextChange.bind(this)} aria-describedby="emailHelp" placeholder="Navn..." onKeyPress={this.keyPressed}/>
                                        </div>
                                        <div id="RegisterPageFormFieldsDiv">
                                            <label htmlFor="exampleInputEmail1">Email: </label>
                                            <input type="email" name={"email"} className="form-control" id="emailInput"
                                                onChange={this.handleTextChange.bind(this)}
                                                aria-describedby="emailHelp" placeholder="Email..." onKeyPress={this.keyPressed}/>
                                        </div>
                                        <div id="RegisterPageFormFieldsDiv">
                                        <label htmlFor="exampleInputEmail1">Telefon:</label>
                                        <input type="tel" pattern={"[0-9]{8}"} name={"phone"} className="form-control" id="exampleInputEmail1"
                                            onChange={this.handleTextChange.bind(this)}
                                            aria-describedby="emailHelp" placeholder="Telefon..." onKeyPress={this.keyPressed}/>
                                        </div>
                                        <div id="RegisterPageFormFieldsDiv">
                                            <label htmlFor="exampleInputPassword1">Passord:</label>
                                            <input type="password" name="password" className="form-control" id="passwordInput"
                                                onChange={this.handleTextChange.bind(this)}
                                                placeholder="Passord..." onKeyPress={this.keyPressed}/>
                                        </div>
                                        <div id="RegisterPageFormFieldsDiv">
                                            <label htmlFor="exampleInputPassword1">Gjenta passord:</label>
                                            <input type="password" name={"repeatedPassword"} className="form-control" id="passwordInput"
                                                onChange={this.handleTextChange.bind(this)}
                                                placeholder="Gjenta passord..." onKeyPress={this.keyPressed}/> 
                                        </div>
                                        <div id="RegisterPageFormButtonDiv">
                                            <button type="button"
                                                    id={"regBtn"}
                                                    className="btn btn-outline-dark"
                                                    onClick={this.regUser.bind(this)} disabled={this.state.name === "" || this.state.email === ""
                                            || this.state.phone === "" || this.state.password === "" || this.state.repeatedPassword === ""}>Registrer
                                            </button>
                                            <button type="button" className="btn btn-outline-dark" onClick={() => window.location.href="#/login"}> 
                                                Allerede bruker?
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                    <div>
                        <FooterTransparent />
                    </div>    
                </div>
            </div>
        );
    }

    toggleModal(feedback){
        let title = "";
        if(feedback === "Bruker registrert!"){
            title = "Suksess"
        }else{
            title = "Feil"
        }

        this.setState({
            synligModal: !this.state.synligModal,
            modalFeedback: feedback,
            modalTitle: title,
        })
    }

    handleTextChange = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };


    showFeedback(feedback){
        if(feedback === "phoneAndPasswords"){
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret må være på 8 siffer og passordene må matche.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }
        else if(feedback === "phone"){
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret må være på 8 siffer.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }else if(feedback === "passwords"){
            confirmAlert({
                title: 'Feil',
                message: 'Passordene må matche.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }else if(feedback === "successfullRegistration"){
            confirmAlert({
                title: 'Suksess!',
                message: 'Bruker registrert!',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }else if(feedback === "samePhone"){
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret er allerede i bruk.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }else if(feedback === "sameEmail"){
            confirmAlert({
                title: 'Feil!',
                message: 'Eposten er allerede i bruk!',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }

    }

    regUser = () => {

        {if(!(this.state.phone.match(/^\d{8}$/)) && this.state.password !== this.state.repeatedPassword){
            this.showFeedback("phoneAndPasswords")

        }else if(!(this.state.phone.match(/^\d{8}$/))){
            this.showFeedback("phone");

        }else if(this.state.password !== this.state.repeatedPassword){

            this.showFeedback("passwords");

        }else{
            let userService = new UserService();
            let user = new User(null, this.state.name, this.state.email, this.state.phone, this.state.password, null, null);
            userService.registerUser(user)
                .then(() => {
                    console.log("kommer hit ja")
                    this.showFeedback("successfullRegistration");
                    window.location.hash = "/login";
                })
                .catch((error) => {
                    console.error(error.response.data);
                    if (error.response.data.sqlMessage.indexOf("email") > -1) {
                        console.log("e-post");
                        this.showFeedback("sameEmail");
                    }
                    if (error.response.data.sqlMessage.indexOf("phone") > -1) {
                        console.log("telefon");
                        this.showFeedback("samePhone");
                    }
                })
            }
        }
    };


}

export default RegisterPage;