import React, {Component} from 'react';
import '../../../css/ViewUser.css';
import {adminService} from "../../../service/AdminService";

class ViewUser extends Component {

    deleteUser = () => {
        adminService.deleteUser(this.props.id)
            .then(() => {
                console.log("User deleted")
            })
            .catch((error) => {
                console.error(error);
            })
    };


    render() {
        return(
            <div class="pageSetup">
                <div className="row" id={"ViewUserMain"}>
                    <div className="col" id={"idCol"}>
                        <p>{this.props.id}</p>
                    </div>
                    <div className="col">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="col">
                        <p>{this.props.email}</p>
                    </div>
                    <div className="col">
                        <p>{this.props.phone}</p>
                    </div>
                    <div className="col">
                        <p>{this.props.role}</p>
                    </div>
                    <div className="col">
                        <input type="radio" checked={this.props.approved == 1} readOnly={true} />
                    </div>
                    <div className="col">
                        <a className="btn btn-primary" href={"#/admin/users/" + this.props.id + "/edit"} role="button">Rediger</a>
                        <button className="btn-danger">Slett</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewUser;