import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar'
import "../../../css/EditUserPage.css"
import {adminService} from "../../../service/AdminService";
import Footer from '../../Footer/Footer'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-toastify";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

class EditUserPage extends Component {

    state = {
        id : -1,
        name: "",
        email: "",
        phone: "",
        tempRole: "",
        profile_photo : "",
        roles: [],
        roleID: "",
        roleChosen: "",
        approved: "",
    };


    componentDidMount() {
        window.scrollTo(0,0);
        adminService.getUser(this.props.match.params.id)
            .then((user) => {
                    this.setState({
                        id : this.props.match.params.id,
                        name: user[0].name,
                        email: user[0].email,
                        phone: user[0].phone,
                        profile_photo : user[0].profile_photo,
                        approved: user[0].approved,
                        tempRole: user[0].role_id
                    });
                adminService.getRoleByID(this.state.tempRole).then(role => this.setState({roleChosen: role[0].role})).catch(error => console.error(error))
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
            this.setState({
                roles: roles
            })

        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="pageSetup">
                <Navbar/>
                <div className={"EditUserPageWrapper"}>
                    <div className={"row"}>
                        <div className={"column"}>
                            <div className={"pbContainer"}>
                                <img id="EditUserAdminProfile" alt="profilePic"
                                     src={this.state.profile_photo === null
                                     || this.state.profile_photo === "" ? "https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" : "http://" + ipAdress + ":8080/image/" + this.state.profile_photo}/>
                            </div>
                        </div>


                        <div className={"column"}>
                            <div className={"infoContainer"}>
                                <form>

                                    {/* --- NAME --- */}

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Navn</label>
                                        <input name = "name" value={this.state.name} className="form-control" type="text"
                                               id={"EditUserPageInput"}
                                               onChange={this.handleTextChange.bind(this)}/>
                                    </div>


                                    {/* --- EMAIL --- */}

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">E-post</label>
                                        <input name = "email" value={this.state.email} className="form-control" type="text"
                                               id={"EditUserPageInput"}
                                               onChange={this.handleTextChange.bind(this)}/>
                                    </div>

                                    {/* --- PHONE --- */}

                                    <div className="form-group">
                                        <label className="form-check-label" htmlFor="exampleCheck1">Telefon</label>
                                        <input name = "phone" value={this.state.phone} className="form-control" type="text"
                                               id={"EditUserPageInput"}
                                               onChange={this.handleTextChange.bind(this)}/>
                                    </div>


                                    {/* --- ROLE DROPDOWN --- */}


                                    <label className={"form-check-label"}>Rolle</label>
                                    <div className={"btnRow"}>
                                        <div className={"dropdownColumn"}>
                                            <div className="dropdown" id={"roleDropdown"}>
                                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false">
                                                    {this.state.roleChosen}</button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {this.state.roles.map(role => {
                                                        return <div className={"dropdown-item"}> <a
                                                                  href = {"#/admin/users/"+this.state.id+"/edit"}
                                                                  onClick={() => this.handleDropdownChange(role)}>{role}</a>
                                                                </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- DELETE BUTTON --- */}

                                        <div className={"btnColumn"}>
                                            <button id={"deleteBtn"} onClick={() => this.submitDeleteButton()} type={"button"} className={"btn btn-danger"}>Slett</button>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input onClick={() => this.handleCheckboxChange()} className="form-check-input"
                                               type="checkbox" checked={this.state.approved} value="checkbox"
                                               id="godkjentCheckbox"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">Godkjent</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* --- SAVE BUTTON --- */}

                    <button id={"EditUserSaveBtn"} type={"button"} className={"btn btn-primary"} onClick={() => {this.submitSaveChanges()}}>Lagre endringer</button>

                </div>
                <Footer/>
            </div>
        );
    }

    handleTextChange = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    deleteUser() {
        adminService.deleteUser(this.props.match.params.id)
            .then(() => window.location.hash = "/admin/users")
            .catch((error) => console.error(error))
    }

    handleCheckboxChange() {
        this.setState({
            approved: !this.state.approved
        })
    }

    handleDropdownChange(role) {
        this.setState({
            roleChosen: role
        })
    }

    submitSaveChanges() {
        confirmAlert({
            title: 'Bekreftelse av rediering',
            message: 'Er du sikker på at du vil redigere brukeren?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.saveChanges()
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    submitDeleteButton() {
        confirmAlert({
            title: 'Bekreftelse av sletting',
            message: 'Er du sikker på at du vil slette brukeren?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.deleteUser()
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    saveChanges() {
        adminService.getRole(this.state.roleChosen).then(id => {
            adminService.assignRole(this.props.match.params.id, id[0].role_id)
                .then(response  => console.log(response))
                .catch((error) => console.error(error))
        });

        {
            if (this.state.approved) {
                adminService.approveUser(this.props.match.params.id)
                    .then(response => console.log(response))
                    .catch(error => console.error(error));

            } else {
                adminService.disapproveUser(this.props.match.params.id)
                    .then(response => console.log(response))
                    .catch(error => console.error(error));
            }
        }

        if (this.state.phone.match(/^\d{8}$/) && this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            adminService.updateUser(this.state.name, this.state.email, this.state.phone, this.props.match.params.id)
                .then(() => window.location.hash="/admin/users")
                .catch(error => console.error(error));
        }else{
            toast("Ugyldig telefonnummer eller epost.", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});
        }
    };

    componentDidMount() {
        let roles = [];
        window.scrollTo(0,0);

        adminService.getUser(this.props.match.params.id)
            .then(user => {
                    this.setState({
                        id: this.props.match.params.id,
                        name: user[0].name,
                        email: user[0].email,
                        phone: user[0].phone,
                        profile_photo: user[0].profile_photo,
                        approved: user[0].approved,
                        tempRole: user[0].role_id
                    });
                    adminService.getRoleByID(this.state.tempRole)
                    .then(role => this.setState({roleChosen: role[0].role}))
                    .catch(error => console.error(error))
            })
            .catch((error) => console.error(error));

        adminService.getRoles().then(rolesReceived => {
            rolesReceived.map(role => {
                roles.push(role.role)
            });
            this.setState({
                roles: roles
            })
        }).catch(error => console.error(error));
    }
}

export default EditUserPage;