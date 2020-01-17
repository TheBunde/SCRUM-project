import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import "../GuestEventCard/GuestEventCard";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {eventService} from "../../../../service/EventService";

class GuestMainPage extends Component {
    state = {
        events: [],
    };

    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getAllEvents().then(events => {this.setState({events: events})}).catch(error => {console.error(error)})
    }

    render() {  
        return (
            <div>
                <div id="GuestMainPageContainer">

                    <h1>Arrangementer</h1>
                    <div className={"cardsContainer"}>
                        {this.state.events.map(event => (
                            <GuestEventCard key={event.event_id} name = {event.name} description = {event.description} date={event.date}
                            place = {event.place} img_url = {event.img_url}/>))
                        }
                    </div>


                    <button type="button" class="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/portal"}>Arrangørportal</button>
                    <button type="button" class="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/event/public/162"}>Gjestevisning av arrangementer</button>

                </div>
            </div>
        )
    }
}

export default GuestMainPage;
