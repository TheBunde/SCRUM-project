import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '../../css/Calendar.css';
import { createHashHistory } from 'history';
import './main.scss'
import NavbarMainPage from "../Navbar/NavbarMainPage";
import {eventService} from "../../service/EventService";
import {confirmAlert} from "react-confirm-alert";
import Footer from "../Footer/Footer";
import {auth, authenticate} from "../../service/UserService";

const history = createHashHistory();

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {id: 1, title: "one", date: "2020-01-21"},{id: 2, title: "to", date: "2020-01-22"},{id: 3, title: "Tre", date: "2020-01-23"}
            ],
            check: {}
        }

    }


    componentDidMount() {
        authenticate();
        if (auth.authenticated) {
            console.log("Er logget inn")
            this.setState(
                {
                    check: 1
                }
            )
            console.log(this.state.check);
        } else {
            this.setState(
                {
                    check: 2
                }
            )
            console.log(this.state.check);
            console.log("Er ikke logget inn")
        }
        let list = [];
        eventService.getNonFiledEvents().then(events => {
            events.map(item => list.push({id: item.event_id, title: item.name, date: this.formatDate(item.date)}))
            console.log(list);
            this.setState({
                    events: list
                }
            )}).catch(error => console.error(error.message));
    }





    formatDate(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);


        return year + "-" + month + "-" + date;
    }

    render() {
        let myEvents = this.state.events;
        console.log(myEvents);

        return (
            <div>
                <NavbarMainPage/>
                <div id="CaledarShowDiv">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        events= {myEvents}
                        eventClick={function (calEvent) {
                            console.log("SE ME " + this.state.check)
                            if(this.state.check === true){
                                confirmAlert({
                                    title: calEvent.event._def.title,
                                    buttons: [
                                        {
                                            label: 'Se arrangement',
                                            onClick : () => history.push("/event/public/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Se redigerbart arrangement',
                                            onClick : () => history.push("/event/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Avslutt'
                                        }
                                    ]
                                });
                            }else{
                                confirmAlert({
                                    title: calEvent.event._def.title,
                                    buttons: [
                                        {
                                            label: 'Se arrangement',
                                            onClick : () => history.push("/event/public/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Avslutt'
                                        }
                                    ]
                                });
                            }


                        }}
                    />
                </div>
                <Footer/>
            </div>

        )

    }

    move(id){
        history.push("/event/public/" + id)
    }

}