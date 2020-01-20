import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import "../GuestEventCard/GuestEventCard";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {eventService} from "../../../../service/EventService";
import NavbarMainPage from "../../../Navbar/NavbarMainPage";
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
                    <NavbarMainPage/>

                    <div id={"mainPageTitleDiv"}>
                        <h1></h1>

                    </div>
                        <div className={"eventCardsContainer"}>
                            {this.state.events.map(event => (
                                <GuestEventCard key={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                place = {event.place} img_url = {event.img_url}/>))
                            }
                        </div>

                    </div>
                </div>
        )
    }
}

export default GuestMainPage;
