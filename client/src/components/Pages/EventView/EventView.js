import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "../../../css/EventView.css"
import {eventService} from '../../../service/EventService'

class EventView extends Component{

    constructor(props){
        super(props);
        this.state= {
            event_id: "",
            name: "",
            date: "",
            place: "",
            artists: "",
            tech_rider: "",
            hospitality_rider: "",
            personnel: "",
            category_id: "",
            filed: "",
            pending: "",
            img_url: "",
            description: ""
        }
    }

    componentDidMount(){
        eventService.getEventById(this.props.match.params.id).then(events => this.setState({
            event_id: events[0].event_id,
            name: events[0].name,
            date: events[0].date,
            place: events[0].place,
            artists: events[0].artists,
            tech_rider: events[0].tech_rider,
            hospitality_rider: events[0].hospitality_rider,
            personnel: events[0].personnel,
            category_id: events[0].category_id,
            filed: events[0].filed,
            pending: events[0].pending,
            img_url: events[0].img_url,
            description: events[0].description}))
            .catch(error => console.error(error.message));
    }
        

    render() {
        return (
            <div>
                <Navbar />
                <div id="eventViewBackground">
                    <div id="eventViewContainer">
                        <div id="eventViewTitle">
                            <h1>{this.state.name}</h1>
                        </div>
                        <div id="eventViewInnerContainer">
                            <div id="infoBox">
                                <div id="eventViewLocation">
                                    <h3>Lokasjon</h3>
                                    <p>{this.state.place}</p>
                                </div>
                                <div id="eventViewDate">
                                    <h3>Dato</h3>
                                    <p>{this.state.date}</p>
                                </div>
                                <div id="eventViewArtists">
                                    <h3>Artister</h3>
                                </div>
                                
                            </div>
                            <div id="mapBox">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe id="gmap_canvas"
                                                src="https://maps.google.com/maps?q=Sukkerhuset&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                                        <a href="https://www.instazilla.net"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="eventViewButtons">
                            <div id="eventViewBack">
                                <button type="button" className="btn btn-outline-primary" onClick={() => window.location.href = "#/event"}>Back</button>
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
            </div>
        );
    }
}

export default EventView;




/*
* Pers nice tabell i bootstrap

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

*/