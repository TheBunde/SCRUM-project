import React, {Component} from 'react';
import "../../../css/ShowProfile.css"
import { createHashHistory } from 'history';

import {adminService} from '../../../service/AdminService'
import {ProfileService} from "../../../service/ProfileService";
import {Link} from "react-router-dom";

import { User} from "../EditProfile/EditProfile";


import Navbar from "../../Navbar/Navbar";
import Back from "../../Back/Back";

const history = createHashHistory();

class ShowProfile extends Component{

    user_id = this.props.match.params.userID;

    constructor(props) {
        super(props);
        this.state = {user: {name: "aaaasdasda"}}

    }

    componentDidMount() {
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
        console.log("SE ME " + this.state.user)
    };



    render(){


        return(
            <div className={"profilePageWrapper"}>
                <Navbar/>
                <Back/>
                <div id="profileContainer">
                    <h1>Min profil</h1>

                    <div className={"pbHolder"}/>

                    <div className={"row"}>

                        <div className={"col-sm-6"}>
                            <h5>Brukernavn: </h5>
                        </div>

                        <div className={"col-sm-6"}>

                    </div>



                    </div>



                    <div id="ShowProfileButtonDiv">
                        <div id="ShowProfileBtn">
                            <button type="button" className="btn btn-info btn-lg" onClick={() => this.editProfile(this.user_id)}>Endre profil</button>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    editProfile(id){

        history.push("/profile/"+ id + "/edit")
    }

}

export default ShowProfile;