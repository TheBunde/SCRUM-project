import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "./EditUserPage.css"
import {adminService} from "../../../service/AdminService";

class EditUserPage extends Component{


    state = {
        name: "",
        email: "",
        phone: "",
        roles: [],
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
                                                Dropdown button
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"btnColumn"}>
                                        <button id={"deleteBtn"} type="submit" className="btn btn-danger">Slett</button>
                                    </div>

                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Godkjent
                                        </label>
                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );

    }

    componentDidMount() {
        adminService.getUser(this.props.match.params.id)
            .then((user) => {
                    this.setState({
                        name: user[0].name,
                        email: user[0].email,
                        phone: user[0].phone,
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            });
    }
}

export default EditUserPage;