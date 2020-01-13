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
            <div>
                <li className="list-group-item">
                    <div className="col-sm-1">
                        <p>{this.props.id}</p>
                    </div>
                    <div className="col-sm-2">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="col-sm-2">
                        <p>{this.props.email}</p>
                    </div>
                    <div className="col-sm-1">
                        <p>{this.props.phone}</p>
                    </div>
                    <div className="col-sm-2">
                        <p>{this.props.role}</p>
                    </div>
                    <div className="col-sm-2">
                        <input type="radio" checked={this.props.approved === 1} readOnly={true} />
                    </div>
                    <div className="col-sm-2">
                        <a className="btn btn-primary" href={"#/admin/users/" + this.props.id + "/edit"} role="button">Rediger</a>
                        <button className="btn btn-danger">Slett</button>
                    </div>
                </li>
            </div>
        )
    }
}

export default ViewUser;