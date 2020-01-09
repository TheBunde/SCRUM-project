import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar'
import "../../../css/EventPage.css"

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

class EventPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount(){

        let event1 = new event(1, "Pers fest", "01.01.19", "Per hoster moshpit", "Sukkerhuset", "Metallica", null, null, "Martin & Simon", 3, "false", "true", "https://media.npr.org/assets/img/2013/03/21/liturgy_wide-b0db450374d1862cacfb1fd49a54360db58aaefc-s800-c85.jpg")
        let event2 = new event(1, "Simons på skitur", "01.01.19", "Simon ser frem til fyll og fanteri", "Sukkerhuset", "Metallica", null, null, "Martin & Simon", 3, "false", "true", "https://www.skistar.com/globalassets/bilder-nya-skistar.com/kartor/pistkartor-1920/are_pistkartor_1920x1400_1920.jpg?maxwidth=924&quality=80")

        this.setState({events: [event1, event2]});
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
                                        <a className="dropdown-item" href="#">Alle arrangementer</a>
                                        <a className="dropdown-item" href="#">Kommende arrangementer</a>
                                        <a className="dropdown-item" href="#">Utførte arrangementer</a>
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
                                        <a className="dropdown-item" href="#">Navn</a>
                                        <a className="dropdown-item" href="#">Dato</a>
                                        <a className="dropdown-item" href="#">Kategori</a>
                                    </div>
                                </div>
                            </div>
                            <div id="eventPageSearchBar">
                                <input className="form-control" type="text" placeholder="Søk" aria-label="Search"></input>
                            </div>
                        </div>
                        <div id="eventPageEventTable">
                            {this.state.events.map(event => (
                                <div>
                                    <EventCard event_id={event.event_id} name={event.name} img_url={event.img_url} description={event.description}/>
                                </div>
                            ))}  
                        </div>
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
                <a onClick={() => window.location.href = ""}>
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