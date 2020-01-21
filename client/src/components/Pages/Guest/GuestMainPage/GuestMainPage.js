import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import "../GuestEventCard/GuestEventCard";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {eventService} from "../../../../service/EventService";
import NavbarMainPage from "../../../Navbar/NavbarMainPage";
class GuestMainPage extends Component {
    state = {
        events: [],
        url: "",
    };

    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getAllActive().then(events => {console.log(events);this.setState({events: events})}).catch(error => {console.error(error)});
    }


    render() {  
        return (
            <div>
                <div id="GuestMainPageContainer">
                    <NavbarMainPage/>

                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={"http://localhost:8080/image/" + "files-157912049118706fecd6c-79d2-4499-bb89-c2384423fc6a.jpg"} alt="First slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={"http://localhost:8080/image/" + "files-15791680110431ffe2088-ff1d-437a-ac61-080ad76ddc4a.jpg"} alt="Second slide"/>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={"http://localhost:8080/image/" + "files-1579455373316e6183fc8-3812-4766-8fa4-51ac118e2ef3.jpg"} alt="Third slide"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                           data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                           data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div className={"guestMainPageTitleDiv"}>
                        <h3>Alle arrangementer</h3>
                        <input className="form-control border-dark" type="text" placeholder="Søk" aria-label="Search" id="mainPageSearchBar" onChange={() => this.handleSearch()}/>
                    </div>

                    <div className={"eventCardsContainerBackground"}>

                        <div className={"eventCardsContainer"}>
                            {this.state.events.map(event => (
                                <GuestEventCard key={event.event_id} id={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                place = {event.place} img_url = {event.img_url}/>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GuestMainPage;
