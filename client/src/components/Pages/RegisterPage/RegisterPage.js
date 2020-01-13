import React, {Component} from 'react';

import "./RegisterPage.css"
import UserService, {User} from "../../../services/UserService.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {NavbarMainPage} from '../../Navbar/Navbar'

class RegisterPage extends Component{

    state = {
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
    
    render() {
        return (
            <div className={"wrapper"}>
                <NavbarMainPage/>
                <div className={"registerContainer"}>
                <h1 id={"regTitle"}>Registrer ny bruker</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Navn: </label>
                        <input type="name" name={"name"} className="form-control" id="firstNameInput"
                               onChange={this.handleTextChange.bind(this)} aria-describedby="emailHelp" placeholder="Navn..."/>

                        <label htmlFor="exampleInputEmail1">Email: </label>
                        <input type="email" name={"email"} className="form-control" id="emailInput"
                               onChange={this.handleTextChange.bind(this)}
                               aria-describedby="emailHelp" placeholder="Email..."/>

                        <label htmlFor="exampleInputEmail1">Telefon:</label>
                        <input type="tel" pattern={"[0-9]{8}"} name={"phone"} className="form-control" id="exampleInputEmail1"
                               onChange={this.handleTextChange.bind(this)}
                               aria-describedby="emailHelp" placeholder="Telefon..."/>

                        <label htmlFor="exampleInputPassword1">Passord:</label>
                        <input type="password" name="password" className="form-control" id="passwordInput"
                               onChange={this.handleTextChange.bind(this)}
                               placeholder="Passord..."/>

                        <label htmlFor="exampleInputPassword1">Gjenta passord:</label>
                        <input type="password" name={"repeatedPassword"} className="form-control" id="passwordInput"
                               onChange={this.handleTextChange.bind(this)}
                               placeholder="Gjenta passord..."/>

                        <button type="button"
                                id={"regBtn"}
                                className="btn btn-primary btn-lg"
                                onClick={this.regUser.bind(this)} disabled={this.state.name === "" || this.state.email === ""
                        || this.state.phone === "" || this.state.password === "" || this.state.repeatedPassword === ""}>Registrer

                        </button>
                    </div>
                </form>

                <Modal show={this.state.synligModal} name={"passwordModal"} onHide={() => {this.toggleModal("")}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalFeedback}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {this.toggleModal("")}}>
                            Ok!
                        </Button>
                    </Modal.Footer>
                </Modal>
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


    regUser = () => {

        let feedback = "";
        {if(!(this.state.phone.match(/^\d{8}$/)) && this.state.password !== this.state.repeatedPassword){
            feedback = "Nummeret må være 8 sifre og passordene må være like.";
            this.toggleModal(feedback);

        }else if(!(this.state.phone.match(/^\d{8}$/))){
            feedback = "Nummeret må være 8 sifre";

            this.toggleModal(feedback);

        }else if(this.state.password !== this.state.repeatedPassword){

            feedback = "Passordene må stemme";
            this.toggleModal(feedback);

        }else{
            let userService = new UserService();
            let user = new User(null, this.state.name, this.state.email, this.state.phone, this.state.password, null, null);
            userService.registerUser(user)
                .thens(() => {
                    this.toggleModal("Bruker registrert!");
                    window.location.hash = "/login";
                })
                .catch((error) => {
                    console.error(error.response.data);
                    if (error.response.data.sqlMessage.indexOf("email") > -1) {
                        console.log("e-post");
                        this.toggleModal("E-posten er allerede i bruk");
                    }
                    if (error.response.data.sqlMessage.indexOf("phone") > -1) {
                        console.log("telefon");
                        this.toggleModal("Telefonnummeret er allerede i bruk");
                    }
                })
            }
        }
    };


}

export default RegisterPage;