import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import ViewUser from "./ViewUser";
import AdminService from '../../../service/AdminService'

class AdminUsersPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    }

    render() {
        return (
            <div className={"AdminUsersPageMain"}>
                <Navbar/>
                <h1>Users</h1>
                <div className={"row"}>
                    <div className={"col"}>
                        <h4>id</h4>
                    </div>
                    <div className={"col"}>
                        <h4>Navn</h4>
                    </div>
                    <div className={"col"}>
                        <h4>E-post</h4>
                    </div>
                    <div className={"col"}>
                        <h4>Telefon</h4>
                    </div>
                    <div className={"col"}>
                        <h4>Rolle</h4>
                    </div>
                    <div className={"col"}>
                        <h4>Godkjent</h4>
                    </div>
                    <div className={"col"}>
                        <h4>Handlinger</h4>
                    </div>
                </div>
                {this.state.users.map((user) => {
                    return (<ViewUser key={user.user_id} id={user.user_id} name={user.name} email={user.email} phone={user.phone} rolle={user.role} approved={user.approved} />)
                })}
            </div>
        );
    }

    componentDidMount() {
        let adminService = new AdminService();
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