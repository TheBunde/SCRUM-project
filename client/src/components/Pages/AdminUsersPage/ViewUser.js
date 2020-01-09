import React, {Component} from 'react';
import '../../../css/ViewUser.css';
import AdminService from "../../../service/AdminService";

class ViewUser extends Component {

    deleteUser = () => {
        let adminService = new AdminService();
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
                <div className="row" id={"ViewUserMain"}>
                    <div className="col">
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
                        <button className="btn-info">Rediger</button>
                        <button className="btn-danger">Slett</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewUser;