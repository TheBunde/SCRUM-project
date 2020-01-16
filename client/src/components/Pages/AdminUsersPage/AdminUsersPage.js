import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import ViewUser from "./ViewUser";
import {adminService} from '../../../service/AdminService'
import "../../../css/AdminUsersPage.css"

import Card from "react-bootstrap/esm/Card";

class AdminUsersPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    }

    render() {
        return (

            <div className={"AdminUsersPageWrapper"}>
                <Navbar/>

                <div className={"card"}>
                    <div className={"card-header"}>
                        <div className={"row"}>

                            <div className="col-sm-1">
                                <p>Id</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Navn</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Email</p>
                            </div>
                            <div className="col-sm-1">
                                <p>Telefon</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Rolle</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Godkjent</p>
                            </div>
                            <div className="col-sm-2">
                                <p>Rediger</p>
                            </div>
                        </div>
                    </div>

                </div>

                {this.state.users.map((user) => {
                    console.log(user);
                    return (<ViewUser key={user.user_id} id={user.user_id} name={user.name} email={user.email} phone={user.phone} role={user.role_id} approved={user.approved} />)
                })}
            </div>
        );
    }

    componentDidMount() {
        adminService.getUsers()
            .then((users) => {
                    this.setState({
                        users: users
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            })
    }


}

export default AdminUsersPage;