import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "./EditUserPage.css"
import {adminService} from "../../../service/AdminService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class EditUserPage extends Component{


    state = {
        name: "",
        email: "",
        phone: "",
        roles: [],
        roleID: "",
        roleChosen: "Ingen rolle valgt",
        approved: "",
        synligModal: "",
        modalTitle: "",
        modalFeedback: "",
    };



    render() {
        return (
            <div className={"EditUserPageWrapper"}>
                <Navbar />

                <div className={"row"}>
                    <div className={"column"}>

                        <div className={"pbContainer"}>
                            <p>Profilbilde</p>
                        </div>
                    </div>


                    <div className={"column"}>

                        <div className={"infoContainer"}>

                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Navn</label>
                                    <input value={this.state.name} className="form-control" type="text" placeholder="Readonly input here…"
                                           readOnly/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">E-post</label>
                                    <input value={this.state.email} className="form-control" type="text" placeholder="Readonly input here…"
                                           readOnly/>
                                </div>
                                <div className="form-group">
                                    <label className="form-check-label" htmlFor="exampleCheck1">Telefon</label>
                                    <input value={this.state.phone} className="form-control" type="text" placeholder="Readonly input here…"
                                           readOnly/>
                                </div>
                                <label className={"form-check-label"}>Rolle</label>





                                <div className={"btnRow"}>

                                    <div className={"dropdownColumn"}>

                                        <div className="dropdown" id={"roleDropdown"}>
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                {this.state.roleChosen}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {this.state.roles.map(role => {
                                                    return <a className="dropdown-item" onClick={() => this.handleDropdownChange(role)}>{role}</a>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"btnColumn"}>
                                        <button id={"deleteBtn"} onClick={() => {this.toggleModal("delete")}} type="submit" className="btn btn-danger">Slett</button>
                                    </div>

                                </div>

                                <div className="form-check">
                                    <input onClick={() => this.handleCheckboxChange()} className="form-check-input" type="checkbox" checked={this.state.approved} value="checkbox" id="defaultCheck1"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Godkjent
                                        </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <Modal show={this.state.synligModal} name={"passwordModal"} onHide={() => {this.toggleModal("")}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalFeedback}</Modal.Body>
                    <Modal.Footer>
                        <a className={"btn btn-primary"} href={"/#/admin/users/"} onClick={() => {
                            if(this.state.modalTitle==="Advarsel"){
                                this.deleteUser()
                                }
                            }}>
                            Ok
                        </a>
                    </Modal.Footer>
                </Modal>

               <button id={"EditUserSaveBtn"} disabled={this.state.roleChosen==="Ingen rolle valgt" || this.state.approved === ""} onClick={() => {this.saveChanges(); this.toggleModal("save")}} type="button" className="btn btn-primary">Lagre endringer</button>
            </div>
        );
    }

    toggleModal(feedback){

        {if(feedback === "delete") {
            this.setState({
                synligModal: !this.state.synligModal,
                modalFeedback: "Er du sikker på at du vil slette denne brukeren?",
                modalTitle: "Advarsel",
            });
        }else if(feedback === "save"){
            this.setState({
                synligModal: !this.state.synligModal,
                modalFeedback: "Endringene er lagret!",
                modalTitle: "Suksess"
            });
        }else{
            this.setState({
                synligModal: !this.state.synligModal
            })
        }
        }
    }

    deleteUser(){
        adminService.deleteUser(this.props.match.params.id).then((response) =>
            {window.location.href="/#/admin/users/"}).catch((error) => console.error(error))
    }

    handleCheckboxChange(){
        this.setState({
            approved: !this.state.approved
        })
    }

    handleDropdownChange(role){
        this.setState({
            roleChosen: role
        })
    }

    saveChanges(){
        adminService.getRole(this.state.roleChosen).then(id =>
            adminService.assignRole(this.props.match.params.id, id[0].role_id).then(() => console.log("ok")).catch((error) => console.error(error))).catch((error => {console.error(error)}));

        {if(this.state.approved){
            adminService.approveUser(this.props.match.params.id).then((response) => console.log(response)).catch((error) => {console.error(error)})
        }else{
            adminService.disapproveUser(this.props.match.params.id).then((response) => console.log(response)).catch((error) => {console.error(error)})
        }}
    };

    componentDidMount() {
        adminService.getUser(this.props.match.params.id)
            .then((user) => {
                    this.setState({
                        name: user[0].name,
                        email: user[0].email,
                        phone: user[0].phone,
                        approved: user[0].approved
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            });
        let roles = [];
        adminService.getRoles().then(rolesReceived => {
            rolesReceived.map(role => {
                roles.push(role.role)
            });
            console.log(roles);
            this.setState({
                roles: roles
            })

        }).catch((error) => {
            console.error(error);
        });
    }
}

export default EditUserPage;