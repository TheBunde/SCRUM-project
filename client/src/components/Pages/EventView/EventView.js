import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "../../../css/EventView.css"

class EventView extends Component{

    constructor(props){
        super(props);
        this.state= {
            artists: ["Banana Airlines", "D.D.E", "Ole Ivars", "Metallica", "Scooter"],
            location: ["Sukkerhuset"],
            date: ["01.01.21"]
        }
    }

    render() {



        return (
            <div>
                <Navbar />

                <div id="eventViewContainer">
                    <div id="eventViewTitle">
                        <h1>Navn</h1>
                    </div>
                    <div id="eventViewInnerContainer">
                        <div id="infoBox">
                            <div id="eventViewLocation">
                                <h3>Lokasjon</h3>
                                <p>{this.state.location[0]}</p>
                            </div>
                            <div id="eventViewDate">
                                <h3>Dato</h3>
                                <p>{this.state.date[0]}</p>
                            </div>
                            <div id="eventViewArtists">
                                <h3>Artister</h3>
                            </div>
                            <div id="eventViewArtistContainer">
                                <table className="table table-borderless">
                                    <tbody>
                                    {this.state.artists.map(artist =>
                                    <tr>
                                        <th scope="row">{artist}</th>
                                    </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="mapBox">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe width="300" height="300" id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=Sukkerhuset&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                                    <a href="https://www.instazilla.net"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="eventViewButtons">
                        <div id="eventViewBack">
                            <button type="button" className="btn btn-outline-primary">Back</button>
                        </div>
                        <div id="eventViewArchive">
                            <button type="button" className="btn btn-outline-primary">Archive</button>
                        </div>
                        <div id="eventViewEdit">
                        <button type="button" className="btn btn-outline-primary">Edit</button>
                        </div>
                        <div id="eventViewDelete">
                            <button type="button" className="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventView;