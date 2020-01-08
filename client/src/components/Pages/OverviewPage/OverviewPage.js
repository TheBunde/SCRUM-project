import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';

import Navbar from '../../Navbar/Navbar'
const history = createHashHistory();

class OverviewPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />

                <div id="OverviewDiv">
                    <h1 id="OverviewTitle"> Main page</h1>
                    <div id="OverviewButtonsDiv">

                        <button id="OverviewButtons" type="button" className="btn btn-info btn-lg mr-5" onClick={this.addEvent} >Legg til nytt event</button>
                        <button id="OverviewButtons" type="button" className="btn btn-info btn-lg mr-5" onClick={this.seEvents}>Se alle arrangementer</button>
                        <button id="OverviewButtons" type="button" className="btn btn-info btn-lg" >Se profil</button>
                    </div>

                </div>


            </div>
        );
    }

    addEvent(){
        history.push("/overview/addEvent")
    }

    seEvents(){
        history.push("/event")
    }

    seProfile(){

    }
}

export default OverviewPage;