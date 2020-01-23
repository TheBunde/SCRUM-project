import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import '../../../css/EventView.css'
import {eventService} from '../../../service/EventService'
import { createHashHistory } from 'history';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../../css/CommentSection.css'
import {auth, UserService} from "../../../service/UserService";
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
        this.keyPressed = this.keyPressed.bind(this);
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

    formatDateComments(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);
        let hours = tempDate.slice(11, 13);
        let minutes = tempDate.slice(14, 16);

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

    keyPressed(event) {
        if (event.key === "Enter" && (this.state.name !== "" && this.state.email !== "" && this.state.phone !== "" && this.state.password !== "" && this.state.repeatedPassword !== "")) {
            this.publishComment();
        }
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
                <Navbar />
                <div id="eventViewTitleEvent">
                    <div id="eventViewStatus">
                        <a className={"btn btn-lg border-" + color}>{this.getStatus(this.state.canceled, this.state.pending, this.state.filed, this.state.date)}</a>
                    </div>
                    <div id="eventViewTitle">
                        <h1>{this.state.name}</h1>
                        <hr id="eventViewTitleHR"/>
                    </div>
                    <div id="eventViewDropdown" className="dropdown">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                Handlinger
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button" disabled={!(this.checkRights()===1 || this.checkRights()===2)} onClick={() => this.submitEventApproveButton(this.state.event_id)}>Godkjenn arrangement</button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" type="button" disabled={!(this.checkRights()===1 || this.checkRights() === 2|| this.checkRights()===3)} onClick={() => history.push("/event/" + this.state.event_id + "/edit")}>Rediger arrangement</button>
                                <button className="dropdown-item" type="button" disabled={!(this.checkRights()===1 || this.checkRights()===3)} onClick={() => this.submitEventArchiveButton(this.state.event_id)}>Arkiver arrangement</button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" type="button" disabled={!(this.checkRights()===1 || this.checkRights()===2)} onClick={() => this.submitEventCancelButton(this.state.event_id)}>Avlys arrangement</button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" type="button" disabled={!(this.checkRights()===1 || this.checkRights()===2)} onClick={() => this.submitEventDeleteButton(this.state.event_id)}>Slett arrangement</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="eventViewBackground">
                    <div id="eventViewImageContainer">
                        <div id="eventViewImage">
                            <img src={"http://localhost:8080/image/" + this.state.img_url} alt={this.state.name} />
                        </div>
                    </div>
                    
                    <div id="eventViewInfoBoxContainer">
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
                                                <iframe width="300" height="300" id="gmap_canvas" src={"https://maps.google.com/maps?q=" + mapLocation(this.state.place) + "%2C%20Trondheim&t=&z=15&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                                <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/"></a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
    
                        <div id="eventViewArtistsContainer">
                            <div id="eventViewArtists">
                                <div>
                                    <h3>Artister</h3>
                                </div>
                                <div>
                                    <p>{this.state.artists}</p>
                                </div>
                            </div>
                        </div>

                        <div id="eventViewContactInfoContainer">
                            <div id="eventViewContactInfo">
                                <div>
                                    <h3>Kontaktinformasjon</h3>
                                </div>
                                <div>
                                    <p>{"Navn: " + this.state.contactInfo_name}</p>
                                    <p>{"Tlf: " + this.state.contactInfo_phone}</p>
                                    <p>{"E-post: " + this.state.contactInfo_email}</p>   
                                </div>
                            </div>
                        </div>
                        

                        <div id="eventViewInfoTicketsContainer">
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

                        <div id="eventViewFilesContainer">
                            <div id="eventViewFiles">
                                <div>
                                    <h4>Personell</h4>
                                    <button id="eventViewInfoDownloadButtons" class="btn" disabled={this.state.personnel === ""} onClick={() => window.open("http://localhost:8080/image/" + this.state.personnel)} target="_blank"><i className="fa fa-download"></i> Last ned</button>
                                </div>

                                <div>
                                    <h4>Kontrakt</h4>
                                    <button id="eventViewInfoDownloadButtons" class="btn" disabled={this.state.contract === ""} onClick={() => window.open("http://localhost:8080/image/" + this.state.contract)} target="_blank"><i className="fa fa-download"></i> Last ned</button>
                                </div>

                                <div>
                                    <h4>Teknisk rider</h4>
                                    <button id="eventViewInfoDownloadButtons" class="btn" disabled={this.state.tech_rider === ""} onClick={() => window.open("http://localhost:8080/image/" + this.state.tech_rider)} target="_blank"><i className="fa fa-download"></i> Last ned</button>
                                </div>

                                <div>
                                    <h4>Hospitality rider</h4>
                                    <button id="eventViewInfoDownloadButtons" class="btn" disabled={this.state.hospitality_rider === ""} onClick={() => window.open("http://localhost:8080/image/" + this.state.hospitality_rider)} target="_blank"><i className="fa fa-download"></i> Last ned</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    <div id="eventViewDescriptionContainer">
                        <div id="eventViewDescription">
                            <div id="eventViewDescriptionBox">
                                <div>
                                    <div id="eventViewDescriptionBoxTitle">
                                        <h1>Beskrivelse av arrangementet</h1>
                                    </div>
                                    {descriptionArray().map(paragraph => (
                                        <div id="eventViewParagraphs">
                                            <h6>{paragraph}</h6>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="eventViewCommentSectionContainer">
                        <div id="eventViewCommentSection">
                                <div class="comment-wrapper">
                                    <div class="panel panel-info">
                                        <div class="panel-heading">
                                            <h3>Kommentarfelt</h3>
                                        </div>
                                        <div class="panel-warning">
                                            <p>Her kan dere dele informasjon eller erfaringer som ble gjort under arrangementplanleggingen.</p>
                                        </div>
                                        <div class="panel-body">
                                        <textarea type="text" class="form-control" id="commentInput" placeholder="Skriv en kommentar ..." rows="3" onKeyPress={this.keyPressed}></textarea>
                                        <br />
                                        <button type="button" class="btn btn-outline-info pull-right" onClick={() => this.publishComment()}>Publiser</button>
                                        <div class="clearfix"></div>
                                        <hr />
                                        <div id="comments">
                                            <ul class="media-list">
                                            {this.state.comments.map(comments => (
                                                <li class="media">
                                                <div class="media-body" id="eventViewCommentSectionComments">
                                                    <div id="eventViewCommentSectionUserInfo">
                                                        <strong class="text-info"> {comments.name}</strong>
                                                        <span class="text-muted pull-right">
                                                            <small class="text-muted">{this.formatDate(comments.date)}</small>
                                                        </span>
                                                    </div>
                                                    <p>
                                                        {comments.comment}
                                                    </p>
                                                    <hr />
                                                </div>
                                            </li>
                                            ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }

    publishComment = event => {

        let commentInputElement = document.getElementById("commentInput");
        let commentInput = commentInputElement.value; 

        let commentArray = this.state.comments;

        commentArray.push({
            event_id: this.props.match.params.id,
            user_id: auth.user_id,
            name: this.state.user.name,
            date: new Date(),
            comment: commentInput
        });

        this.setState({comments: commentArray});
        eventService.addComment(this.props.match.params.id, auth.user_id, commentInput).then((response) => console.log("Adding comment worked")).catch(error => console.error(error.message));
        commentInputElement.value = "";
    };


    checkRights(){
        if(auth.role === "admin") return 1;

        else if(auth.role === "Sceneansvarlig") return 2;

        else if(auth.role === "Økonomisjef") return 3;

        else return 4;

    };

    notifyDeleteSuccess = () => {
        toast("Sletting av arrangement vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    submitEventDeleteButton(id) {
        confirmAlert({
            title: 'Bekreftelse av sletting',
            message: 'Er du sikker på at du vil slette arrangementet?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.delete(id)
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    submitEventArchiveButton(id) {
        confirmAlert({
            title: 'Bekreftelse av arkivering',
            message: 'Er du sikker på at du vil arkivere arrangementet?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.archive(id),
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    submitEventApproveButton(id) {
        confirmAlert({
            title: 'Bekreftelse av godkjenning',
            message: 'Er du sikker på at du vil godkjenne arrangementet?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.pend(id),
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    submitEventCancelButton(id) {
        confirmAlert({
            title: 'Bekreftelse av avlysing',
            message: 'Er du sikker på at du vil avlyse arrangementet?',
            buttons: [
                {
                    label: 'Ja',
                    onClick : () => this.cancel(id),
                },
                {
                    label: 'Nei'
                }
            ]
        });
    }

    delete(id){
        eventService
            .deleteEventComments(id)
            .then(() => eventService.deleteEventDetails(id))
            .then(() => eventService.deleteEvent(id))
            .then(() =>{
                this.notifyDeleteSuccess();
                history.push("/event")
            } )
            .catch(e => console.error(e));
    }

    archive(id){
        eventService
            .updateFiled(id)
            .catch(e => console.error(e));
        history.push("/event")
    }

    pend(id){
        eventService
            .updatePending(id)
            .catch(e => console.error(e));
        history.push("/event")
    }

    cancel(id){
        eventService
            .updateCancel(id)
            .catch(e => console.error(e));
        history.push("/event")
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

<div id="eventViewButtons">
    <div id="eventViewBack">
        <button type="button" className="btn btn-outline-primary" onClick={() => window.location.href = "#/event"}>Tilbake</button>
    </div>

    <div id="eventViewEdit">
        <button type="button" className="btn btn-outline-primary" onClick={() => window.location.href = "#/event/" + this.state.event_id + "/edit"}>Rediger</button>
    </div>

    <div id="eventViewArchive">
        <button type="button" onClick={() => this.submitEventArchiveButton(this.state.event_id)}  className="btn btn-outline-primary">Arkiver</button>
    </div>
        
    <div id="eventViewDelete">
        <button type="button" onClick={() => this.submitEventDeleteButton(this.state.event_id)} className="btn btn-outline-danger">Slett</button>
    </div>

    <div id="eventViewDelete">
        <button type="button" onClick={() => this.pend(this.state.event_id)} className="btn btn-outline-danger">pending</button>
    </div>

</div>


*/


