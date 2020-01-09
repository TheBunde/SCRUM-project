import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';

import Navbar from '../../Navbar/Navbar'
const history = createHashHistory();

class OverviewPage extends Component{
    
    render() {
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
                            <button type="button" className="btn btn-info btn-lg" onClick={this.seeProfile}>Vis profil</button>
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

    seeProfile(){
        history.push("/profile/user")
    }
}

export default OverviewPage;