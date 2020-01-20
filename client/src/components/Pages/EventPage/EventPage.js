import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar'
import "../../../css/EventPage.css"
import {eventService} from "../../../service/EventService";
import $ from 'jquery';
import Footer from '../../Footer/Footer'

export class event {
    constructor(event_id, name, date, description, place, artists, tech_rider, hospitality_rider, personnel, category_id, filed, pending, canceled, img_url){
        this.event_id = event_id;
        this.name = name;
        this.date = date;
        this.place = place;
        this.artists = artists;
        this.tech_rider = tech_rider;
        this.hospitality_rider = hospitality_rider;
        this.personnel = personnel;
        this.category_id = category_id;
        this.filed = filed;
        this.pending = pending;
        this.canceled = canceled;
        this.img_url = img_url;
        this.description = description;
    }
}

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedEvents: [],
            shownEvents: [],
            length: 4
        }
        this.handleSearch = this.handleSearch.bind(this);
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

    getCurrentDate() {
        let newDate = new Date()
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

    eventFilterAllActive(){
        this.fetchNonFiled()
        this.setState({shownEvents: this.state.loadedEvents});
    }
    eventFilterPending(){
        this.fetchNonFiled()
        this.setState({shownEvents: this.state.loadedEvents.filter(e=> (e.date > this.getCurrentDate()) && e.pending === 1)});
    }
    eventFilterArchived(){
        this.getArchivedEvents();
        this.setState({shownEvents: this.state.loadedEvents});
    }
    eventFilterApproved() {
        this.fetchNonFiled()
        this.setState({shownEvents: this.state.loadedEvents.filter(e => (e.date > this.getCurrentDate()) && e.pending === 0)})
    }

    sortByName(){
        this.setState(this.state.shownEvents.sort((a, b) => a.name.localeCompare(b.name)))
    }
    sortByDate() {
        console.log(this.state.shownEvents[0].date)
        this.setState(this.state.shownEvents.sort((a, b) => b.date.localeCompare(a.date)))
    }
    sortByCategory() {
        this.setState(this.state.shownEvents.sort((a, b) => b.category_id - a.category_id))
    }

    handleSearch() {
        const searchTitleElement = document.getElementById("searchBar");
        let searchTitle = searchTitleElement.value;
        if(searchTitle !== ""){
            this.setState({shownEvents: this.state.loadedEvents.filter(e => e.name.toLowerCase().includes(searchTitle.toLowerCase()) || e.description.toLowerCase().includes(searchTitle.toLowerCase()))});
        } else {
            this.resetSortAndFilterDropdowns();
            this.componentDidMount();
        }
    }

    resetSortAndFilterDropdowns() {
        $("#eventPageShow .btn:first-child ").text("Vis");
        $("#eventPageSort .btn:first-child ").text("Sorter etter");
    }

    getAllEvents(){
        eventService.getAllEvents().then(events => this.setState({
            shownEvents: events,
            loadedEvents: events}))
            .catch(error => console.error(error.message));
    }
    
    getArchivedEvents(){
        eventService.getAllArchived().then(events => this.setState({
            shownEvents: events,
            loadedEvents: events}))
            .catch(error => console.error(error.message));
    }

    fetchNonFiled(){
        eventService.getNonFiledEvents().then(events => this.setState({
            loadedEvents: events}))
            .catch(error => console.error(error.message));
    }

    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getNonFiledEvents().then(events => this.setState({
            shownEvents: events,
            loadedEvents: events}))
            .catch(error => console.error(error.message));
    }

    getUserFromNavbar = user => {
            console.log(user);
    };

    render() {

        console.log(this.state.shownEvents)
        $(function(){
            $("#eventPageShow a").click(function(){
            $("#eventPageShow .btn:first-child ").text($(this).text());
        });
            $("#eventPageSort a").click(function(){
            $("#eventPageSort .btn:first-child ").text($(this).text());
        });
    });

        return (
            <div class="pageSetup">
                <Navbar getUser={this.getUserFromNavbar()} />
                <div>
                    <div id="eventPageBackground">
                        <div id="eventPageContainer">
                            <div id="eventPageBanner">
                                <div id={"eventPageTitle"}>
                                    <h1>ARRANGEMENTER</h1>
                                </div>
                            </div>
                            <div className={"eventPageInformation"}>
                            <div id="eventPageBar">
                                <div id="eventPageShow">
                                    <div className="dropdown">
                                        <button className="btn border-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Vis
                                        </button>
                                        <div className="dropdown-menu" id="eventPageFilter" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => this.eventFilterAllActive()}>Alle arrangementer som ikke er arkivert</a>
                                            <a className="dropdown-item" onClick={() => this.eventFilterPending()}>Under planlegging</a>
                                            <a className="dropdown-item" onClick={() => this.eventFilterApproved()}>Ferdig planlagte arrangementer</a>
                                            <a className="dropdown-item" onClick={() => this.eventFilterArchived()}>Arkiverte arrangementer</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="eventPageSort">
                                    <div className="dropdown">
                                        <button className="btn border-dark dropdown-toggle " type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sorter etter
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => {this.sortByName(); this.getUserFromNavbar()}}>Navn</a>
                                            <a className="dropdown-item" onClick={() => this.sortByDate()}>Dato</a>
                                            <a className="dropdown-item" onClick={() => this.sortByCategory()}>Kategori</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="eventPageSearchBar">
                                    <input className="form-control border-dark" type="text" placeholder="Søk" aria-label="Search" id="searchBar" onChange={() => this.handleSearch()}/>
                                </div>
                            </div>
                            <div className="dropdown-divider border-dark"></div>
                            <div id="eventPageEventTable">
                                {this.state.shownEvents.slice(0, this.state.length).map(event => (
                                    <div>
                                        <EventCard event_id={event.event_id} name={event.name} img_url={event.img_url} description={event.description} date={this.formatDate(event.date)} compareDate={event.date} place={event.place} pending={event.pending} filed={event.filed} canceled={event.canceled}/>
                                    </div>
                                ))}

                            </div>
                            <div id="eventPageFetchMoreEventsButton">
                                {this.state.shownEvents.length > this.state.length &&
                                <div>
                                    <button type="button" className="btn btn-light"
                                            onClick={() => this.setState({length: this.state.length + 6})}>Last inn flere arrangementer
                                    </button>
                                </div>
                                }
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

class EventCard extends Component {

    render(){

        let color = this.getColor(this.props.canceled, this.props.pending, this.props.filed, this.props.compareDate);
        return (
            <div id="eventPageEventCardLink">
                <a onClick={() => window.location.href = "#/event/" + this.props.event_id}>
                    <div class="card eventPageEventCard">
                            <img class="card-img-top eventPageEventCardImg" src={"http://localhost:8080/image/" + this.props.img_url} alt={this.props.name} />

                            <div class="card-body">

                            <div id="eventPageCardBody" class="card-body">
                                <h5 class="card-title">{this.props.name}</h5>
                                <div id="eventPageStatus">

                                    <a className={"btn btn-sm btn-"+color}>Status: {this.getStatus(this.props.canceled, this.props.pending, this.props.filed,  this.props.compareDate)}</a>
                                </div>
                                <div id="eventPageCardLocation">
                                    {this.props.place}
                                </div>
                                <div id="eventPageCardDate">
                                    {this.props.date}
                                </div>
                            </div>
                            </div>
                    </div>
                </a>
            </div>
        )
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

export default EventPage;

/*
//this.props.date.slice(0, 16).replace("T", " ")

//<div id="eventPageFetchMoreEventsButton">
//    {this.state.shownEvents.length > this.state.length &&
//    <div>
//        <button type="button" className="btn btn-light"
//                onClick={() => this.setState({length: this.state.length + 6})}>Last inn flere arrangementer
//        </button>
//    </div>
//    }
//</div>
*/
