import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import {eventService} from "../../../service/EventService";
import {FileService} from "../../../service/FileService";


import Calendar from 'react-calendar-mobile'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'

class AddEvent extends Component{
    constructor(props){
        super(props);
        this.state ={
            date: new Date(), dateChosenHour: 20, dateChosenMin: "00",
            Name: "", Description: "", Place: "", Artists: "",
            ContactName: "", ContactPhone: "", ContactEmail: "",
            Tech: "", Hospitality: "", Personnel: "", Contract: "",
            Picture: "", Category: 1,
            GratisTicketBox: false, GratisTicketAmount: null,
            StandardTicketBox: false, StandardTicketAmount: null,
            VIPTicketBox: false, VIPTicketAmount: null,
            EarlyBirdTicketBox: false, EarlyBirdTicketAmount: null,
            GoldenCircleTicketBox: false, GoldenCircleTicketAmount: null,
            Categories: [], Tickets: [],
            DateHour:["00","01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            DateMin:["00","01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
        };
        this.changeBox = this.changeBox.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
        this.registerByID = this.registerByID.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeValue = this.changeValue.bind(this)
    }

    componentDidMount() {
        eventService
            .getCategories()
            .then(categories => this.setState({Categories: categories}))
            .catch(Error => console.log(Error));

        eventService
            .getTicket()
            .then(data => this.setState({Tickets: data}))
            .catch(Error => console.log(Error));

    }

    changeValue(event){
        this.setState({[event.target.id]: event.target.value})
    }

    changeBox(event){
        this.setState({[event.target.id]: event.target.checked});
        if(this.state[event.target.id]) this.setState({[event.target.name]: 0});
    }

    changeDate(event) {
        this.setState({date: event})
    }

    formValidation(){

        return (this.state.Name === "" || this.state.Description === "" || this.state.Place === "" || this.state.Artists === "" || this.state.ContactName === "" || this.state.ContactEmail === "" || this.state.ContactPhone === "" || this.state.Tech === "" || this.state.Hospitality === "" || this.state.Personnel === "");

    }

    render() {
        return (
            <div class="pageSetup">
                <Navbar />
                <div id="EventInputContainer">
                    <h2 id ="EventInputHeader">Registrering av nytt arrangement</h2>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Name"
                               value ={this.state.Name}
                               onChange={this.changeValue}
                        />
                    </div>

                    <div id ="EventInputFields">
                        <p id="EventInputLabels">Dato for arrangementet:</p>
                        <div id="EventInputCalendar">
                            <Calendar
                                onSelectDate = {this.changeDate}
                                startOnMonday = {true}
                            />
                        </div>
                    </div>

                    <div id = "EventInputFields">
                        <p id="EventInputLabels">Tidspunkt for arrangementet:</p>
                        <div id="EventDateInput">
                            <select className="form-control"
                                    id ="dateChosenHour"
                                    value={this.state.dateChosenHour}
                                    onChange={this.changeValue}
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
                                    id ="dateChosenMin"
                                    value={this.state.dateChosenMin}
                                    onChange={this.changeValue}
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
                               id="Description"
                               value ={this.state.Description}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Sted for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="Place"
                               value ={this.state.Place}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Artists"
                               value ={this.state.Artists}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - navn:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactName"
                               value ={this.state.ContactName}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - telefonnummer:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactPhone"
                               value ={this.state.ContactPhone}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - email:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactEmail"
                               value ={this.state.ContactEmail}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Tech Riders:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Tech"
                               value ={this.state.Tech}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Tech Riders:</p>
                        <input type="file"
                               className="form-control"
                               id="fileInput"
                               required={true}
                        />
                        <button type={"button"} className={"btn btn-outline-primary btn-lg"} onClick={() => this.uploadImage()}>Last opp</button>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Hospitality Riders:</p>
                        <input type="text"
                               className="form-control"
                               id="Hospitality"
                               value ={this.state.Hospitality}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Hospitality Riders:</p>
                        <input type="file"
                               className="form-control"
                               id="fileInput"
                               required={true}
                        />
                        <button type={"button"} className={"btn btn-outline-primary btn-lg"} onClick={() => this.uploadImage()}>Last opp</button>
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Nødvendig personell:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Personnel"
                               value ={this.state.Personnel}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Nødvendig personell:</p>
                        <input type="file"
                               className="form-control"
                               id="fileInput"
                               required={true}
                        />
                        <button type={"button"} className={"btn btn-outline-primary btn-lg"} onClick={() => this.uploadImage()}>Last opp</button>
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Bilde:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Picture"
                               value={this.state.Picture}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Bilde:</p>
                        <input type="file"
                               className="form-control"
                               id="fileInput"
                               required={true}
                        />
                        <button type={"button"} className={"btn btn-outline-primary btn-lg"} onClick={() => this.uploadImage()}>Last opp</button>
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Kontrakt:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Contract"
                               value ={this.state.Contract}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontrakt:</p>
                        <input type="file"
                               className="form-control"
                               id="fileInput"
                               required={true}
                        />
                        <button type={"button"} className={"btn btn-outline-primary btn-lg"} onClick={() => this.uploadImage()}>Last opp</button>
                    </div>

                    <div id ="EventInputFields">
                        <p id = "EventInputLabels">Kategori for arrangementet:</p>
                        <select className ="form-control"
                                id ="Category"
                                value ={this.state.Category}
                                onChange={this.changeValue}
                        >
                            {this.state.Categories.map(category =>
                                <option
                                value ={category.category_id}
                                defaultValue={category.category_id}
                                >
                                    {category.name}
                                </option>
                            )};
                        </select>
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
                                   onChange={this.changeValue}
                            />
                        </div>
                    </div>
                    )}
                </div>
                <div id = "EventInputButton">
                    <button type="button"
                            className="btn btn-outline-primary btn-lg"
                            onClick={this.registerEvent}
                            disabled={this.formValidation()}
                    >
                        Registrer arrangement
                    </button>
                </div>
                <Footer />
                </div>
            </div>

        );
    }

    registerEvent(){
        let altPicture = "https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg";
        if(this.state.Picture === "") this.setState({Picture: altPicture});

        let day = this.state.date.getDate();
        let month = this.state.date.getMonth()+1;
        let year = this.state.date.getFullYear();
        let hour = this.state.dateChosenHour;
        let min = this.state.dateChosenMin;
        if(day < 10){
            day = "0" + day
        }
        if(month < 10){
            month = "0"+ month
        }

        let date = year + "-" + month + "-" + day + " " + hour + ":" + min + ":00" ;

        eventService
            .addEvents(this.state.Name, date, this.state.Description, this.state.Place, this.state.Artists, this.state.Tech, this.state.Hospitality, this.state.Personnel, this.state.Picture, this.state.Contract)
            .then(data => this.registerByID(data.insertId))
            .catch(Error => console.log(Error));
    }

    uploadImage() {
        let fileService = new FileService();
        let image = document.getElementById("fileInput");
        console.log(image.files[0]);

        fileService.uploadImage(image.files[0])
            .then((res) => {
                console.log(res);
        })
            .catch((err) => {
                console.error(err);
            })
    }

    registerByID(EventId){
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"]){
                if(this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0){
                    eventService
                        .addTicket(ticket.ticket_category_id, EventId, this.state[ticket.name + "TicketAmount"])
                        .catch(Error => console.log(Error))
                }
            }
        });

        eventService
            .addCategory(EventId, this.state.Category)
            .catch(Error => console.log(Error));

        eventService
            .addContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, EventId)
            .catch(Error => console.log(Error));
    }
}

export default AddEvent;