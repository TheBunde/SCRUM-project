import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
import NavbarMainPage from '../../../Navbar/NavbarMainPage'
import Footer from '../../../Footer/Footer'
import '../../../../css/GuestEventView.css'
import {eventService} from '../../../../service/EventService'
import { createHashHistory } from 'history';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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
            event_tickets: []
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
        window.scrollTo(0,0);
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
        eventService.getTicketFromEvent(this.props.match.params.id).then(tickets => this.setState({event_tickets: tickets}))
    }
        

    render() {

        function mapLocation(place) {
            return place.trim(" ,");
        }



        return (
            <div>
                <NavbarMainPage />
                <div id="guestEventViewBackground">

                    <div id="titleEvent">
                        <div id="guestEventViewTitle">
                            <h1>{this.state.name}</h1>
                            <hr id="guestEventViewTitleHR"/>
                        </div>
                    </div>

                    <div id="guestEventViewImageContainer">
                        <div id="guestEventViewImage">
                            <img src={"http://localhost:8080/image/" + this.state.img_url} alt={this.state.name} />
                        </div>
                    </div>
                    
                    <div id="guestEventViewInfoBoxContainer">
                        <div id="guestEventViewInfoBox">
                            <div class="card" id="guestEventViewInfoBoxCard">
                                <div class="card-body" id="guestEventViewInfoBoxCardGridContainer">
                                    <div>
                                        <h3>{this.state.category_name}</h3>
                                        <h5 class="card-title">Sted: {this.state.place}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Dato: {this.formatDate(this.state.date)}</h6>
                                    </div>

                                    <div id="guestEventViewInfoBoxMap">
                                        <div class="mapouter">
                                            <div class="gmap_canvas">
                                                <iframe width="250" height="250" id="gmap_canvas" src={"https://maps.google.com/maps?q=" + mapLocation(this.state.place) + "%2C%20Trondheim&t=&z=15&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                                <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/"></a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div id="guestEventViewInfoTicketsContainer">
                            <div id="guestEventViewInfoTickets">
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
                        
                    </div>
                    </div>
                    
                    <div id="guestEventViewDescriptionContainer">
                        <div id="guestEventViewDescription">
                            <div id="guestEventViewDescriptionBox">
                                <div>
                                    <div id="guestEventViewDescriptionBoxTitle">
                                        <h1>Beskrivelse av arrangementet</h1>
                                    </div>
                                    
                                    <h5>{this.state.description}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }

}

export default EventView;