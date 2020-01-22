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
import {UserService} from '../../../../service/UserService.js';
import {auth} from "../../../../service/UserService";
import {toast} from "react-toastify";

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
            canceled:"",
            img_url: "",
            description: "",
            event_tickets: [],
            contactInfo_name: "",
            contactInfo_phone: "",
            contactInfo_email: "",
            comments: [],
            user: {}
        }
    }

    formatDate(backendDate) {
        let thisDate = new Date(backendDate);

        let year = thisDate.getFullYear();
        let month = thisDate.getMonth()+1;
        if(month < 10) month = "0" + month;
        let date = thisDate.getDate();
        if(date < 10) date = "0" + date;
        let hours = thisDate.getHours();
        if(hours < 10) hours = "0" + hours;
        let minutes = thisDate.getMinutes();
        if(minutes < 10) minutes = "0" + minutes;

        return date + "." + month + "." + year + " " + hours + ":" + minutes;
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
            canceled: events[0].canceled,
            img_url: events[0].img_url,
            description: events[0].description,
            category_name: events[0].category_name}))
            .catch(error => console.error(error.message));
        eventService.getTicketFromEvent(this.props.match.params.id).then(tickets => this.setState({event_tickets: tickets}));
        eventService.getContactinfoForEvent(this.props.match.params.id).then(contactInfo => this.setState({contactInfo_name: contactInfo.name, contactInfo_phone: contactInfo.phone, contactInfo_email: contactInfo.email})).catch(Error => console.log(Error));
        eventService.getComments(this.props.match.params.id).then(comments => this.setState({comments: comments})).catch(Error => console.log(Error));
        let userService = new UserService();
        userService.getUser(auth.user_id).then(user => this.setState({user: user})).catch((error) => {console.error(error);});
        console.log("auth.user_id: " + auth.user_id);
    }

    render() {
        let descriptionString = JSON.stringify(this.state.description);
        function descriptionArray() {
            if(descriptionString !== undefined){
                /*return descriptionString.substr(1,descriptionString.length-2).split("\\n");*/
                return descriptionString.substr(1,descriptionString.length-2).split("\\n");
            } 
        }

        function mapLocation(place) {
            return place.trim(" ,");
        }

        let color = this.getColor(this.state.canceled, this.state.pending, this.state.filed, this.state.date);

        return (
            <div>
                <NavbarMainPage />
                <div id="guestEventViewTitleEvent">
                    
                    <div id="guestEventViewTitle">
                        <h1>{this.state.name}</h1>
                        <hr id="guestEventViewTitleHR"/>
                    </div>

                </div>
                <div id="guestEventViewBackground">
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
                                                <iframe width="300" height="300" id="gmap_canvas" src={"https://maps.google.com/maps?q=" + mapLocation(this.state.place) + "%2C%20Trondheim&t=&z=15&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                                <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/"></a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
    
                        <div id="guestEventViewArtistsContainer">
                            <div id="guestEventViewArtists">
                                <div>
                                    <h3>Artister</h3>
                                </div>
                                <div>
                                    <p>{this.state.artists}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div id="guestEventViewDescriptionContainer">
                        <div id="guestEventViewDescription">
                            <div id="guestEventViewDescriptionBox">
                                <div>
                                    <div id="guestEventViewDescriptionBoxTitle">
                                        <h2>Beskrivelse av arrangementet</h2>
                                    </div>
                                    {descriptionArray().map(paragraph => (
                                        <div id="guestEventViewParagraphs">
                                            <h6>{paragraph}</h6>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                <Footer />
            </div>
        );
    }


    getStatus(canceled, pending, filed, date){
        let status;
        if(canceled === 1){
            status = "Avlyst"
        }else if(pending === 1 && filed === 0){
            status = "Til godkjenning";
        }
        else if(filed === 1 && pending === 0){
            status = "Arkivert";
        }
        else if(filed === 1 && pending === 1){
            status = "Ikke utført";
        }
        else if(pending === 0 && filed === 0 &&  date > this.getCurrentDate()){
            status = "Kommende";
        }else{
            status = "Utført";
        }
        return status;
    }

    getColor(canceled, pending, filed, date){
        let color;
        if(canceled === 1) {
            color = "danger"
        }else if(pending === 1 && filed === 0){
            color = "warning";
        }
        else if(filed === 1 && pending === 0){
            color = "secondary";
        }
        else if(pending === 0 && filed === 0 &&  date > this.getCurrentDate()){
            color = "success";
        }
        else if(pending === 1 && filed === 1){
            color = "primary";
        }else{
            color = "info";
        }
        return color;
    }

    getCurrentDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        if(date<10){
            date = "0" + date;
        }
        let month = newDate.getMonth()+1;
        if(month<10){
            month = "0" + month;
        }
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        if(hours<10){
            hours = "0" + hours;
        }
        let minutes = newDate.getMinutes();
        if(minutes<10){
            minutes = "0" + minutes;
        }
        return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":00:000Z";
    }


}

export default EventView;


/* 

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


*/


