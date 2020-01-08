import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "../../../css/EventPage.css"

class EventPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />

                <div id="eventPageBackground">
                    <div id="eventPageContainer">
                        <div id="eventPageTitle">
                            <h1>Arrangementer</h1>
                        </div>
                        <div id="eventPageBar">
                            <div id="eventPageShow">
                                <div className="dropdown">
                                    <button className="btn btn-outline dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Vis
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Alle arrangementer</a>
                                        <a className="dropdown-item" href="#">Kommende arrangementer</a>
                                        <a className="dropdown-item" href="#">Utførte arrangementer</a>
                                    </div>
                                </div>
                            </div>
                            <div id="eventPageSort">
                                <div className="dropdown">
                                    <button className="btn btn-outline dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sorter etter
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Navn</a>
                                        <a className="dropdown-item" href="#">Dato</a>
                                        <a className="dropdown-item" href="#">Kategori</a>
                                    </div>
                                </div>
                            </div>
                            <div id="eventPageSearchBar">
                                <input className="form-control" type="text" placeholder="Søk" aria-label="Search"></input>
                            </div>
                            <div id="eventPageInnerContainer">
                                <ul>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventPage;