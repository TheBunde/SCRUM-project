import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import {eventService} from "../../../../service/EventService";
import EventView from "../../EventView/EventView";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {Card} from "react-bootstrap";


class GuestMainPage extends Component {
    state = {
        events: [],
    };

    render() {
        return (
            <div>
                <div id="GuestMainPageContainer">
                    <div className={"cardsContainer"}>
                        {this.state.events.map(event => (
                            <GuestEventCard key={event.event_id} name = {event.name} description = {event.description} date={event.date}
                            place = {event.place} img_url = {event.img_url} artists = {event.artists}/>))
                        }
                    </div>
                    <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/portal"}>Arrangørportal</button>
                    <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/guestview"}>Gjestevisning av arrangementer</button>
                </div>
            </div>
        )
    }

    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getAllEvents().then(events => this.setState({events: events})).catch(error => console.error(error));
    }

}

export default GuestMainPage;
