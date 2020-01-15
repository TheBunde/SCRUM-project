import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
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
            contract: "",
            personnel: "",
            category_id: "",
            filed: "",
            pending: "",
            img_url: "",
            description: "",
            event_tickets: [
                {
                name: "Standard",
                price: 800,
                number: 50
                },
                {
                name: "Gratis",
                price: 0,
                number: 500
                }]
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
            contract: events[0].contract,
            personnel: events[0].personnel,
            category_id: events[0].category_id,
            filed: events[0].filed,
            pending: events[0].pending,
            img_url: events[0].img_url,
            description: events[0].description,
            category_name: events[0].category_name}))
            .catch(error => console.error(error.message));
    }

    
        

    render() {

        function mapLocation(place) {
            return place.trim(" ,");
        }

        /*<img src={"http://localhost:8080/image/" + this.state.img_url} /> */

        return (
            <div>
                <Navbar />
                <div id="eventViewBackground">
                    <div id="eventViewContainer">
                        <div id="eventViewInnerContainer">
                            <div id="eventViewImageDiv">
                                <img src={"https://www.denverkarateonline.com/wp-content/uploads/2017/04/default-image.jpg"} />
                            </div>
                            <div id="eventViewTitle">
                                <h1>{this.state.name}</h1>
                                <hr id="eventViewTitleHR"/>
                            </div>
                            <div id="eventViewInfoBox">
                                <div class="card" id="eventViewInfoBoxCard">
                                    <div class="card-body" id="eventViewInfoBoxCardGridContainer">
                                        <div>
                                            <h3>{this.state.category_name}</h3>
                                            <h5 class="card-title">Sted: {this.state.place}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">Dato: {this.formatDate(this.state.date)}</h6>
                                        </div>

                                        <div id="eventViewInfoBoxMap">
                                            <div class="mapouter">
                                                <div class="gmap_canvas">
                                                    <iframe width="250" height="250" id="gmap_canvas" src={"https://maps.google.com/maps?q=" + mapLocation(this.state.place) + "%2C%20Trondheim&t=&z=15&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                                    <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/"></a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div id="eventViewButtons">
                                            <div id="eventViewBack">
                                                <button type="button" className="btn btn-outline-primary" onClick={() => window.location.href = "#/event"}>Tilbake</button>
                                            </div>

                                            <div id="eventViewEdit">
                                                <button type="button" className="btn btn-outline-primary">Rediger</button>
                                            </div>

                                            <div id="eventViewArchive">
                                                <button type="button" className="btn btn-outline-primary">Arkiver</button>
                                            </div>

                                            <div id="eventViewArchive">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => this.delete(this.state.event_id)}>Slett</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                            <div id="eventViewInfo">
                                <div>
                                    <h3>Beskrivelse</h3>
                                    <p>{this.state.description}</p>
                                </div>
                                
                                <div id="eventViewArtists">
                                    <h3>Artister</h3>
                                    <p>{this.state.artists}</p>
                                </div>

                                <div id="eventViewInfoTickets">
                                    <h3>Billettyper</h3>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Type</th>
                                                <th scope="col">Pris</th>
                                                <th scope="col">Antall</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.event_tickets.map(ticket => 
                                            <tr>
                                                <th scope="row" width="60">{ticket.name}</th>
                                                <td width="30">{ticket.price}</td>
                                                <td width="30">{ticket.number}</td>
                                            </tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <h3>Personnell</h3>
                                    <button id="eventViewInfoDownloadButtons" class="btn" onClick={() => window.open("http://localhost:8080/image/" + this.state.personnel)} target="_blank"><i className="fa fa-download"></i> Download</button>
                                </div>

                                <div>
                                    <h3>Teknisk rider</h3>
                                    <button id="eventViewInfoDownloadButtons" class="btn" onClick={() => window.open("http://localhost:8080/image/" + this.state.tech_rider)} target="_blank"><i className="fa fa-download"></i> Download</button>
                                </div>

                                <div>
                                    <h3>Hospitality rider</h3>
                                    <button id="eventViewInfoDownloadButtons" class="btn" onClick={() => window.open("http://localhost:8080/image/" + this.state.hospitality_rider)} target="_blank"><i className="fa fa-download"></i> Download</button>
                                </div>

                                <div>
                                    <h3>Kontrakt</h3>
                                    <button id="eventViewInfoDownloadButtons" class="btn" onClick={() => window.open("http://localhost:8080/image/" + this.state.contract)} target="_blank"><i className="fa fa-download"></i> Download</button>
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