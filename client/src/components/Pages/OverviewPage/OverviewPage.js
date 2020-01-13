import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';

import Navbar from '../../Navbar/Navbar'
import {profileService} from "../../../service/ProfileService";
const history = createHashHistory();

class OverviewPage extends Component{
    user_id = 9;
    user;

    constructor(props) {
        super(props);
        this.state = {user : {}}

    }

    componentDidMount() {
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
    
    render() {
        //let id = this.state.user.user_id;
        //console.log(id);
        return (
            <div>
                <Navbar/>
                <div id="OverviewDiv">
                    <div id="OverviewTitle"><h1>Forside</h1></div>
                    <div id="OverviewButtonDiv">
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={this.addEvent}>Legg til ny event</button>
                        </div>
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={this.seeEvents}>Se alle eventer</button>
                        </div>
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={() => this.seeProfile(this.state.user.user_id)}>Vis profil</button>
                        </div>
                        <div id="OverviewButtonsLogOut">
                            <button type="button" className="btn btn-dark btn-lg" onClick={this.logOut}>logg ut</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    addEvent(){
        history.push("/overview/addEvent")
    }

    seeEvents(){
        history.push("/event")
    }

    seeProfile(id){
        console.log("SE ME ");

        history.push("/profile/" + id)
    }

    logOut(){
        history.push("/")
    }
}

export default OverviewPage;