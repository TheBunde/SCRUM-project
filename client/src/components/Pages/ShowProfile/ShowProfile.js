import React, {Component} from 'react';
import "../../../css/ShowProfile.css"
import { createHashHistory } from 'history';

import {adminService} from '../../../service/AdminService'
import {ProfileService} from "../../../service/ProfileService";
import {Redirect} from 'react-router-dom';
import { User} from "../EditProfile/EditProfile";


import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";
import {authenticate, auth} from "../../../service/UserService";
import Footer from "../../Footer/Footer";

const history = createHashHistory();

class ShowProfile extends Component {

    user_id = this.props.match.params.userID;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            authorized: ""
        }

    }

    componentDidMount() {
        authenticate();
        //console.log("ID tried: " + this.props.match.params.userID);
        if (this.props.match.params.userID !== auth.user_id) {
            this.setState({
                authorized: false
            })
        } else {
            this.setState({
                authorized: true
            });
            let profileService = new ProfileService();
            profileService.getUser(this.user_id)
                .then(user =>
                    this.setState({
                        user: user
                    })
                )
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    render() {
        return (
                auth.user_id === this.props.match.params.userID ?
                <div>
                    <Navbar/>
                    <Back/>
                    <div id="ShowProfileDiv">
                        <h1>Min profil</h1>
                        <div id="ShowProfileText">

                            <div id="ShowProfileLine">
                                <h4 id="h4">Brukernavn: </h4> <h5 id="h5">{this.state.user.name}</h5>
                            </div>
                            <div id="ShowProfileLine">
                                <h4 id="h4">tlf: </h4><h5 id="h5">{this.state.user.phone}</h5>
                            </div>
                            <div id="ShowProfileLine">
                                <h4 id="h4">E-mail: </h4><h5 id="h5">{this.state.user.email}</h5>
                            </div>
                        </div>


                        <div id="ShowProfileButtonDiv">
                            <div id="ShowProfileBtn">
                                <button type="button" className="btn btn-info btn-lg" onClick={() => this.editProfile(this.user_id)}>Endre profil</button>
                            </div>
                        </div>
                    </div>
                </div>
            : <Redirect to={"/profile/" + auth.user_id } />
        )
    }

    editProfile(id){
        history.push("/profile/"+ id + "/edit")
    }
}

export default ShowProfile;