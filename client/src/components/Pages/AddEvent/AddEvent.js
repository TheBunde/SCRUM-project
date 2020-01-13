import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import {eventService} from "../../../service/EventService";

import Navbar from '../../Navbar/Navbar'

class AddEvent extends Component{
    constructor(props){
        super(props);
        this.state ={
            GratisTicketBox: false,
            GratisTicketAmount: null,
            StandardTicketBox: false,
            StandardTicketAmount: null,
            VIPTicketBox: false,
            VIPTicketAmount: null,
            EarlyBirdTicketBox: false,
            EarlyBirdTicketAmount: null,
            GoldenCircleTicketBox: false,
            GoldenCircleTicketAmount: null,
            Categories: [],
            Tickets: [],
            DateYear: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
            DateMonth: [1,2,3,4,5,6,7,8,9,10,11,12],
            DateDay: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            DateHour:["00","01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            DateMin:["00","01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
        };
        this.changeBox = this.changeBox.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
        this.registerTickets = this.registerTickets.bind(this);
    }

    componentDidMount() {
        let tickets = [];

        eventService
            .getCategories()
            .then(categories => this.setState({Categories: categories}))
            .catch(Error => console.log(Error));

        eventService
            .getTicket()
            .then(data => this.setState({Tickets: data}))
            .catch(Error => console.log(Error));

    }

    changeBox(event){
        this.setState({[event.target.id]: event.target.checked});
        if(this.state[event.target.id]) this.setState({[event.target.name]: 0});
    }

    changeAmount(event){
        this.setState({[event.target.id]: event.target.value})
    }

    render() {
        return (
            <div>
                <Navbar />
                <div id="EventInputContainer">
                    <h2 id ="EventInputHeader">Registering av nytt arrangement</h2>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               className = "form-control"
                               id = "nameInput"
                               required="required"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Dato for arrangementet:</p>
                        <div id ="EventDateInput">
                            <select className="form-control"
                                    id ="dateDayInput"
                            >
                                {this.state.DateDay.map(day =>
                                    <option
                                        key={day}
                                        value ={day}
                                        defaultValue={day}
                                    >
                                        {day}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateMonthInput"
                            >
                                {this.state.DateMonth.map(month =>
                                    <option
                                        key={month}
                                        value ={month}
                                        defaultValue={month}
                                    >
                                        {month}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateYearInput"
                            >
                                {this.state.DateYear.map(year =>
                                    <option
                                        key={year}
                                        value ={year}
                                        defaultValue={year}
                                    >
                                        {year}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateHourInput"
                            >
                                {this.state.DateHour.map(year =>
                                    <option
                                        key={year}
                                        value ={year}
                                        defaultValue={year}
                                    >
                                        {year}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateMinInput"
                            >
                                {this.state.DateMin.map(year =>
                                    <option
                                        key={year}
                                        value ={year}
                                        defaultValue={year}
                                    >
                                        {year}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Beskrivelse for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="descriptionInput"
                               required={true}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Sted for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="placeInput"
                               required={true}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               className = "form-control"
                               id = "artistInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Tech Riders:</p>
                        <input type="text"
                               className = "form-control"
                               id = "tech_ridersInput"
                               required={true}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Hospitality Riders:</p>
                        <input type="text"
                               className="form-control"
                               id="hospitality_ridersInput"
                               required={true}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Nødvendig personell:</p>
                        <input type="text"
                               className = "form-control"
                               id = "personnelInput"
                               required={true}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Bilde:</p>
                        <input type="text"
                               className = "form-control"
                               id = "pictureInput"
                               required={true}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Kontrakt:</p>
                        <input type="text"
                               className = "form-control"
                               id = "contractInput"
                               required={true}
                        />
                    </div>

                    <div id ="EventInputFields">
                        <p id = "EventInputLabels">Kategori for arrangementet:</p>
                        <select className ="form-control"
                                id ="categoryInput"
                                required={true}
                        >
                            {this.state.Categories.map(category =>
                                <option
                                key={category.id}
                                value ={category.id}
                                defaultValue={category.id}
                                >
                                    {category.name}
                                </option>
                            )};
                        </select>
                    </div>
                </div>
                <p id = "EventInputTitle">Billettyper:</p>
                <div id ="EventInputTicketContainer">
                    {this.state.Tickets.map(tickets =>
                    <div id = "EventInputTicketBoxes">
                        <div id="EventInputCheckboxes">
                            <div id ="EventTicketInnerLabel">
                            <label id="EventTicketLabels">{tickets.name + " billetter"}</label>
                            </div>
                            <div id ="EventTicketInnerCheckbox">
                            <input type ="checkbox"
                                   id ={tickets.name + "TicketBox"}
                                   name ={tickets.name + "TicketAmount"}
                                   onChange={this.changeBox}
                            />
                            </div>
                        </div>
                        <div id ="EventTicketAmount">
                            <input type = "number"
                                   id={tickets.name +"TicketAmount"}
                                   className ="form-control"
                                   placeholder={"Antall " + tickets.name + " billetter"}
                                   value = {this.state[tickets.name + "TicketAmount"]}
                                   disabled = {!this.state[tickets.name + "TicketBox"]}
                                   onChange={this.changeAmount}
                            />
                        </div>
                    </div>
                    )}
                </div>

                <div id = "EventInputButton">
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={this.registerEvent}>
                        Registrer arrangement
                    </button>
                </div>
            </div>
        );
    }

    registerEvent(){
        var name = document.getElementById("nameInput").value;
        var date = document.getElementById("dateYearInput").value + "-" + document.getElementById("dateMonthInput").value+ "-" + document.getElementById("dateDayInput").value;
        var description = document.getElementById("descriptionInput").value;
        var place = document.getElementById("placeInput").value;
        var artists = document.getElementById("artistInput").value;
        var tech_riders = document.getElementById("tech_ridersInput").value;
        var hospitality_riders = document.getElementById("hospitality_ridersInput").value;
        var personnel = document.getElementById("personnelInput").value;
        var picture = document.getElementById("pictureInput").value;
        var category = document.getElementById("categoryInput").value;
        var contract = document.getElementById("contractInput").value;

        eventService
            .addEvents(name, date, description, place, artists, tech_riders, hospitality_riders, personnel, picture)
            .then(data => this.registerTickets(data.insertId))
            .catch(Error => console.log(Error));
    }

    registerTickets(EventId){
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"]){
                if(this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0){
                    eventService
                        .addTicket(ticket.ticket_category_id, EventId, this.state[ticket.name + "TicketAmount"])
                        .catch(Error => console.log(Error))
                }
            }
        });

        let category = document.getElementById("categoryInput").value;

        eventService
            .addCategory(EventId, category)
            .catch(Error => console.log(Error))
    }
}

export default AddEvent;