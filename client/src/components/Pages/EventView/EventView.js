import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import "../../../css/EventView.css"
import {eventService} from '../../../service/EventService'
import { createHashHistory } from 'history';

const history = createHashHistory();

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

    formatDate(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);
        let hours = tempDate.slice(11, 13);
        let minutes = tempDate.slice(14, 16);

        return date + "-" + month + "-" + year + " " + hours + ":" + minutes;
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
                        <div id="eventViewInnerContainer">
                            <div id="eventViewImageDiv">
                                <img src={this.state.img_url} alt="Card image cap" />
                            </div>
                            <div id="eventViewTitle">
                                <h1>{this.state.name}</h1>
                                <hr id="eventViewTitleHR"/>
                            </div>
                            <div id="eventViewInfoBox">
                                <div class="card" id="eventViewInfoBoxCard">
                                    <div class="card-body">
                                        <h5 class="card-title">Sted: {this.state.place}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Dato: {this.formatDate(this.state.date)}</h6>
                                        
                                        <div id="eventViewInfoBoxMap">
                                        
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

                                            <div>
                                                <p>
                                                    <button
                                                        className="btn delete btn-outline-danger"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseDelete"
                                                        aria-expanded="false"
                                                        aria-controls="collapseDelete"
                                                    >
                                                        Delete
                                                    </button>
                                                </p>
                                                <div className="collapse" id="collapseDelete">
                                                    <p> Are you sure you want to delete this event?</p>
                                                    <button className="btn delete btn-danger" type="button" data-toggle="collapse" onClick={() => this.delete(this.state.event_id)}>
                                                        I am sure
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        


                                    </div>
                                </div>
                                
                                
                            </div>
                                
                            <div id="eventViewInfo">
                                <h3>Beskrivelse av arrangementet</h3>
                                <p>{this.state.description}</p>
                                
                                <h3>Personnell</h3>
                                <p>{this.state.personnel}</p>
                                
                                <h3>Kategori</h3>
                                <p>{this.state.category_id}</p>
                                
                                <div id="eventViewArtists">
                                            <h3>Artister</h3>

                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    delete(id){
        console.log(id);
        eventService
            .deleteEvent(id)
            .catch(e => console.error(e));
        history.push("/overview")
    }

    archive(id){
        console.log(id);
        eventService
            .updateFiled(id)
            .catch(e => console.error(e));
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