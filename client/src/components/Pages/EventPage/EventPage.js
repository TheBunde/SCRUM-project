import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar'
import "../../../css/EventPage.css"
import {eventService} from "../../../service/EventService";

export class event {
    constructor(event_id, name, date, description, place, artists, tech_rider, hospitality_rider, personnel, category_id, filed, pending, img_url){
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
        this.img_url = img_url;
        this.description = description;
    }
}

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEvents: [],
            shownEvents: [],
            length: 2
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    getCurrentDate() {
        //let currentDate = new Date()
        let currentDate = "20200110";
        return currentDate;
    }
    eventFilterAll(){
        this.setState({shownEvents: this.state.allEvents})
    }
    eventFilterFuture(){
        this.setState({shownEvents: this.state.allEvents.filter(e => e.date >= this.getCurrentDate())})
    }
    eventFilterPast() {
        this.setState({shownEvents: this.state.allEvents.filter(e => e.date < this.getCurrentDate())})
    }

    sortByName(){
        this.setState(this.state.shownEvents.sort((a, b) => a.name.localeCompare(b.name)))
    }
    sortByDate() {
        this.setState(this.state.shownEvents.sort((a, b) => b.date.localeCompare(a.date)))
    }
    sortByCategory() {
        this.setState(this.state.shownEvents.sort((a, b) => b.category_id - a.category_id))
    }

    handleSearch() {
        const searchTitleElement = document.getElementById("searchBar");
        let searchTitle = searchTitleElement.value;
        if(searchTitle !== ""){
            this.setState({shownEvents: this.state.allEvents.filter(e => e.name.toLowerCase().includes(searchTitle.toLowerCase()) || e.description.toLowerCase().includes(searchTitle.toLowerCase()))});
        } else {
            this.componentDidMount()
        }
    }


    componentDidMount(){
        eventService.getAllEvents().then(events => this.setState({
            shownEvents: events,
            allEvents: events}))
            .catch(error => console.error(error.message));
    }

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
                                        <a className="dropdown-item" onClick={() => this.eventFilterAll()}>Alle arrangementer</a>
                                        <a className="dropdown-item" onClick={() => this.eventFilterFuture()}>Kommende arrangementer</a>
                                        <a className="dropdown-item" onClick={() => this.eventFilterPast()}>Utførte arrangementer</a>
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
                                        <a className="dropdown-item" onClick={() => this.sortByName()}>Navn</a>
                                        <a className="dropdown-item" onClick={() => this.sortByDate()}>Dato</a>
                                        <a className="dropdown-item" onClick={() => this.sortByCategory()}>Kategori</a>
                                    </div>
                                </div>
                            </div>
                            <div id="eventPageSearchBar">
                                <input className="form-control" type="text" placeholder="Søk" aria-label="Search" id="searchBar" onChange={() => this.handleSearch()}></input>
                            </div>
                        </div>
                        <div id="eventPageEventTable">
                            {this.state.shownEvents.slice(0, this.state.length).map(event => (
                                <div>
                                    <EventCard event_id={event.event_id} name={event.name} img_url={event.img_url} description={event.description}/>
                                </div>
                            ))}  
                        </div>
                    </div>
                    <div id="eventPageFetchMoreEventsButton">
                        {this.state.shownEvents.length > this.state.length && 
                        <div>
                            <button type="button" class="btn btn-light" onClick={() => this.setState({length: this.state.length+6})}>Last inn flere arrangementer</button>
                        </div> 
                    }
                    </div>
                </div>
            </div>
        );
    }
}

class EventCard extends Component {
    render(){
        return (
            <div id="eventPageEventCardLink">
                <a onClick={() => window.location.href = "#/event/" + this.props.event_id}>
                    <div class="card eventPageEventCard">
                            <img class="card-img-top eventPageEventCardImg" src={this.props.img_url} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{this.props.name}</h5>
                                <p class="card-text">{this.props.description}</p>
                            </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default EventPage;