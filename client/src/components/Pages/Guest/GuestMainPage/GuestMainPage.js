import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import "../GuestEventCard/GuestEventCard";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {eventService} from "../../../../service/EventService";
import NavbarMainPage from "../../../Navbar/NavbarMainPage";
class GuestMainPage extends Component {
    state = {
        events: [],
        sortedEvents: [],
    };

    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getAllActive().then(events => {this.setState({events: events})}).catch(error => {console.error(error)});
    }



    render() {
        let urls = [];
        let dates = [];
        let names = [];
        let places = [];
        let sort = [];
        let id = [];
        if(this.state.events.length >= 3){
            let clone = this.state.events.slice(0);
            sort = clone.sort((a,b) => a.date.localeCompare(b.date));
            console.log(sort);
            sort.forEach(event => {urls.push(event.img_url); names.push(event.name); places.push(event.place); id.push(event.event_id); dates.push(event.date)});
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
                                    <a onClick={() => window.location.href = "#/event/public/" + id[0]}>
                                    <img className="d-block w-100" src={"http://localhost:8080/image/" + urls[0]} alt="First slide"/>
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{names[0]}</h5>
                                            <p>{places[0]}</p>
                                            <p>{this.formatDate(dates[0])}</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="carousel-item">
                                    <a onClick={() => window.location.href = "#/event/public/" + id[1]}>
                                        <img className="d-block w-100" src={"http://localhost:8080/image/" + urls[1]} alt="Second slide"/>
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{names[1]}</h5>
                                            <p>{places[1]}</p>
                                            <p>{this.formatDate(dates[1])}</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="carousel-item">
                                    <a onClick={() => window.location.href = "#/event/public/" + id[2]}>
                                    <img className="d-block w-100" src={"http://localhost:8080/image/" + urls[2]} alt="Third slide"/>
                                    <div className="carousel-caption d-100 d-md-block">
                                        <h5>{names[2]}</h5>
                                        <p>{places[2]}</p>
                                        <p>{this.formatDate(dates[2])}</p>
                                    </div>
                                    </a>
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

                        <div id={"titleAndSearchBarDiv"}>
                            <div className={"guestMainPageTitleDiv"}>
                                <h3>Alle arrangementer</h3>
                            </div>
                        </div>
                        <div className={"eventCardsContainerBackground"}>
                            <div className={"guestEventCardsContainer"}>
                                {this.state.events.map(event => (
                                    <GuestEventCard key={event.event_id} id={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                                    place = {event.place} img_url = {event.img_url}/>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div id={"titleAndSearchBarDiv"}>
                        <div className={"guestMainPageTitleDiv"}>
                            <h3>Alle arrangementer</h3>
                        </div>
                    </div>
                    <div className={"eventCardsContainerBackground"}>
                        <div className={"guestEventCardsContainer"}>
                            {this.state.events.map(event => (
                                <GuestEventCard key={event.event_id} id={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                                place = {event.place} img_url = {event.img_url}/>))
                            }
                        </div>
                    </div>
                </div>
            )
        }

    }

    formatDate(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);
        let hours = tempDate.slice(11, 13);
        let minutes = tempDate.slice(14, 16);

        let thisDate = new Date(year + "-" + month + "-" +date +" " + hours +":00:00");
        thisDate.setHours(thisDate.getHours()+1);


        year = thisDate.getFullYear();
        month = thisDate.getMonth()+1;
        if(month < 10) month = "0" + month;
        date = thisDate.getDate();
        if(date < 10) date = "0" + date;
        hours = thisDate.getHours();
        if(hours < 10) hours = "0" + hours;

        return date + "." + month + "." + year + " " + hours + ":" + minutes;
    }
}

export default GuestMainPage;
