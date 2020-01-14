import React, {Component} from 'react';
import '../../../css/ViewUser.css';
import {adminService} from "../../../service/AdminService";

class ViewUser extends Component {

    state = {
        role: ""
    };

    render() {
        return(

            <div>
                <li className="list-group-item">


                     <div className="row" id={"ViewUserMain"}>

                    <div className="col" id={"idCol"}>
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
                        <p>{this.state.role}</p>
                    </div>
                    <div className="col-sm-2">
                        <input type="radio" checked={this.props.approved === 1} readOnly={true} />
                    </div>
                    <div className="col-sm-2">
                        <a className="btn btn-primary" href={"#/admin/users/" + this.props.id + "/edit"} role="button">Rediger</a>
                    </div>
                     </div>
                </li>
            </div>
        )
    }

    componentDidMount() {
        adminService.getRoleByID(this.props.role).then(role =>
            this.setState({role: role[0].role})).catch((error) => {console.error(error)})
    }
}

export default ViewUser;