import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import {eventService} from "../../../service/EventService";
import {validatePhone, validateEmail} from "../../../validaters";
import {toast} from 'react-toastify';
import Calendar from 'react-calendar'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FileService} from "../../../service/FileService";


class EditEvent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), dateChosenHour: null, dateChosenMin: null,
            Name: "", Description: "", Place: "", Artists: "",
            ContactName: "", ContactPhone: "", ContactEmail: "", haveContactInfo: true,
            Tech: "", Hospitality: "", Personnel: "", Contract: "",
            Picture: "", Category: 1,
            GratisTicketBox: false, GratisTicketAmount: null, GratisTicketPrice: null,
            StandardTicketBox: false, StandardTicketAmount: null, StandardTicketPrice: null,
            VIPTicketBox: false, VIPTicketAmount: null, VIPTicketPrice: null,
            EarlyBirdTicketBox: false, EarlyBirdTicketAmount: null, EarlyBirdTicketPrice: null,
            GoldenCircleTicketBox: false, GoldenCircleTicketAmount: null, GoldenCircleTicketPrice: null,
            Categories: [], Tickets: [],
            DateHour: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            DateMin: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
            contractUploaded : false,
            personellUploaded : false,
            pictureUploaded : false,
            techUploaded : false,
            hospitalityUploaded : false
        };
        this.changeBox = this.changeBox.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.updateEventInfo = this.updateEventInfo.bind(this);
        this.updateTicketInfo = this.updateTicketInfo.bind(this);
        this.updateContactInfo = this.updateContactInfo.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
    }

    changeValue(event){
        this.setState({[event.target.id]: event.target.value})
    }

    changeBox(event) {
        this.setState({[event.target.id + "TicketBox"]: event.target.checked});
        if (this.state[event.target.id + "TicketBox"]){
            this.setState({[event.target.id + "TicketAmount"]: 0});
            this.setState({[event.target.id + "TicketPrice"]: 0});
        }
    }

    changeDate(event) {
        this.setState({date: event})
    }

    formValidation(){
        return !(this.state.Name === "" || this.state.Description === "" || this.state.Place === ""
            || this.state.Artists === "" || this.state.ContactName === "" || this.state.ContactEmail === "" || this.state.ContactPhone === "" || !this.ticketCheck());
    }
    checkDate(){
        let day = this.state.date.getDate();
        let month = this.state.date.getMonth() + 1;
        let year = this.state.date.getFullYear();
        let hour = this.state.dateChosenHour;
        let min = this.state.dateChosenMin;
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        let date = year + "-" + month + "-" + day + " " + hour + ":" + min + ":00";

        return new Date(date) > new Date();
    }

    ticketCheck(){
        let status = false;
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"] === true && (this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0)){
                status = true;
            }
        });
        return status;
    }

    componentDidMount() {
        eventService
            .getEventById(this.props.match.params.id)
            .then(data => this.updateEventInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicket()
            .then(data => this.setState({Tickets: data}))
            .catch(Error => console.log(Error));

        eventService
            .getCategories()
            .then(categories => this.setState({Categories: categories}))
            .catch(Error => console.log(Error));

        eventService
            .getContactinfoForEvent(this.props.match.params.id)
            .then(data => this.updateContactInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicketFromEvent(this.props.match.params.id)
            .then(data => this.updateTicketInfo(data))
            .catch(Error => console.log(Error));
    }

    notifySuccess = () => {
        toast("Registrering av arrangement vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifySuccessDelete = () => {
        toast("Sletting av arrangement vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyDateFailure = () => toast("Ugyldig dato", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyNoFileUploaded = () => toast("Du må laste opp en fil", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyPictureUploaded = () => toast("Fil opplastet. Trykk på lagre endringer for å lagre alt", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});

    notifyUnvalidPhone = () => toast("Ugyldig telefonnummer", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    notifyUnvalidEmail = () => toast("Ugyldig e-post", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    updateEventInfo(data){
        let date = data[0].date.split("T");
        let time = date[1].split(":");
        let hour = Number(time[0])+1;
        if(hour<10) hour = "0"+hour;
        let min = Number(time[1]);
        if(min<10) min = "0"+min;

        this.setState({dateChosenHour: hour});
        this.setState({dateChosenMin: min});
        this.setState({date: new Date(date[0])});
        this.setState({Name: data[0].name});
        this.setState({Description: data[0].description});
        this.setState({Place: data[0].place});
        this.setState({Artists: data[0].artists});
        this.setState({Category: data[0].category_id});
        this.setState({Tech: data[0].tech_rider});
        this.setState({Hospitality: data[0].hospitality_rider});
        this.setState({Personnel: data[0].personnel});
        this.setState({Picture: data[0].img_url});
        this.setState({Contract: data[0].contract});

    }

    updateTicketInfo(data) {
        data.map(ticket => {
            eventService
                .getTicketById(ticket.ticket_category_id)
                .then(name => this.updateTicketAmount(name.name, ticket.number, ticket.price))
                .catch(Error => console.log(Error))
        })
    }

    updateTicketAmount(name, amount, price){
        this.setState({[name + "TicketBox"]: true});
        this.setState({[name + "TicketAmount"]: amount});
        this.setState({[name + "TicketPrice"]: price});
    }

    updateContactInfo(data){
        if(data === undefined){
            this.setState({haveContactInfo: false} )
        }
        else {
            this.setState({ContactName: data.name});
            this.setState({ContactPhone: data.phone});
            this.setState({ContactEmail: data.email});
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div id="EventInputContainer">
                    <h2 id ="EventInputHeader">Redigere arrangement</h2>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Name"
                               value={this.state.Name}
                               onChange={this.changeValue}
                        />
                    </div>

                    <div id ="EventInputFields">
                        <p id="EventInputLabels">Dato for arrangementet:</p>
                        <div id="EventInputCalendar">
                            <Calendar
                                value = {this.state.date}
                                onChange = {this.changeDate}
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
                                {this.state.DateHour.map(hour =>
                                    <option
                                        key={hour}
                                        value ={hour}
                                        defaultValue={hour}
                                    >
                                        {hour}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateChosenMin"
                                    value={this.state.dateChosenMin}
                                    onChange={this.changeValue}
                            >
                                {this.state.DateMin.map(min =>
                                    <option
                                        key={min}
                                        value ={min}
                                        defaultValue={min}
                                    >
                                        {min}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Beskrivelse for arrangementet:</p>
                        <textarea rows="4"
                                  className="form-control"
                                  placeholder={this.state.Placeholder}
                                  id="Description"
                                  value={this.state.Description}
                                  onChange={this.changeValue}>
                        </textarea>
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
                    <div id = "EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Tech Riders:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn"
                                    onClick={() => window.open("http://localhost:8080/image/" + this.state.Tech)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>

                        </div>
                        <div>
                            <p id="EventInputLabels">Nye Tech Riders:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="rider1Input"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button className={""} onClick={() => this.submitNewTechRider()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Hospitality Riders:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn"
                                    onClick={() => window.open("http://localhost:8080/image/" + this.state.Hospitality)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nye Hospitality Riders:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="rider2Input"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewHospitalityRider()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Personnel:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn"
                                    onClick={() => window.open("http://localhost:8080/image/" + this.state.Personnel)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nytt Personnel:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="personellInput"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewPersonell()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende bilde:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn"
                                    onClick={() => window.open("http://localhost:8080/image/" + this.state.Picture)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nytt bilde:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="imageInput"
                                       required={true}
                                       accept={"image/*"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewPicture()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div>
                            <p id = "EventInputLabels">Nåværende kontrakt:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn"
                                    onClick={() => window.open("http://localhost:8080/image/" + this.state.Contract)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Ny kontrakt:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="contractInput"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewContract()}>Bekreft</button>
                            </div>
                        </div>

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
                    <p id="EventInputTitle">Billettyper:</p>
                    <div id="EventInputTicketContainer">
                        <div id="EventInputTicketBoxes">
                            <div id="EventInputCheckboxes">
                                <div id="EventTicketInnerLabel">
                                    <label id="EventTicketLabels">{"Gratis billetter"}</label>
                                </div>
                                <div id="EventTicketInnerCheckbox">
                                    <input type="checkbox"
                                           id={"Gratis"}
                                           checked={this.state.GratisTicketBox}
                                           onChange={this.changeBox}
                                    />
                                </div>
                            </div>
                            <div id="EventTicketInput">
                                <div id="EventTicketAmount">
                                    <input type="number"
                                           id={"GratisTicketAmount"}
                                           className="form-control"
                                           placeholder={"Antall Gratis billetter"}
                                           value={this.state["GratisTicketAmount"]}
                                           disabled={!this.state["GratisTicketBox"]}
                                           onChange={this.changeValue}
                                    />
                                </div>
                                <div id="EventTicketPrice">
                                    <input type="number"
                                           id ={"GratisTicketPrice"}
                                           className="form-control"
                                           value = {0}
                                           disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        {(this.state.Tickets.filter(tickets => (tickets.name !== "Gratis"))).map(tickets =>
                            <div id="EventInputTicketBoxes">
                                <div id="EventInputCheckboxes">
                                    <div id="EventTicketInnerLabel">
                                        <label id="EventTicketLabels">{tickets.name + " billetter"}</label>
                                    </div>
                                    <div id="EventTicketInnerCheckbox">
                                        <input type="checkbox"
                                               id={tickets.name}
                                               checked={this.state[tickets.name +"TicketBox"]}
                                               onChange={this.changeBox}
                                        />
                                    </div>
                                </div>
                                <div id="EventTicketInput">
                                    <div id="EventTicketAmount">
                                        <input type="number"
                                               id={tickets.name + "TicketAmount"}
                                               className="form-control"
                                               placeholder={"Antall " + tickets.name + " billetter"}
                                               value={this.state[tickets.name + "TicketAmount"]}
                                               disabled={!this.state[tickets.name + "TicketBox"]}
                                               onChange={this.changeValue}
                                        />
                                    </div>
                                    <div id="EventTicketPrice">
                                        <input type="number"
                                               id ={tickets.name + "TicketPrice"}
                                               className="form-control"
                                               placeholder={"Pris for " + tickets.name + " billetter" }
                                               value = {this.state[tickets.name + "TicketPrice"]}
                                               disabled={!this.state[tickets.name + "TicketBox"]}
                                               onChange={this.changeValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id = "EventInputButton">
                        <button type="button"
                                className="btn btn-outline-primary btn-lg"
                                onClick={this.registerEvent}
                        >
                            Lagre endringer
                        </button>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }

    submitNewContract() {
        let fileService = new FileService();
        let fileContract = document.getElementById("contractInput");

        fileService.uploadFile(fileContract.files[0])
            .then((res) => {
                this.setState({
                    Contract : res.data.filePath.filename
                });
                this.notifyPictureUploaded();

            })
            .catch((err) => {
                this.notifyNoFileUploaded();
                console.error(err);
            })
    }

    submitNewTechRider() {
        let fileService = new FileService();
        let fileRider1 = document.getElementById("rider1Input");

        fileService.uploadFile(fileRider1.files[0])
            .then((res) => {
                this.setState({
                    Tech : res.data.filePath.filename
                });
                this.notifyPictureUploaded();

            })
            .catch((err) => {
                console.error(err);
                this.notifyNoFileUploaded();
            })

    }

    submitNewHospitalityRider() {
        let fileService = new FileService();
        let fileRider2 = document.getElementById("rider2Input");

        fileService.uploadFile(fileRider2.files[0])
            .then((res) => {
                this.setState({
                    Hospitality : res.data.filePath.filename
                });
                this.notifyPictureUploaded();

            })
            .catch((err) => {
                console.error(err);
                this.notifyNoFileUploaded();
            })


    }

    submitNewPersonell() {
        let fileService = new FileService();
        let filePersonell = document.getElementById("personellInput");

        fileService.uploadFile(filePersonell.files[0])
            .then((res) => {
                this.setState({
                    Personnel : res.data.filePath.filename
                });
                this.notifyPictureUploaded();

            })
            .catch((err) => {
                console.error(err);
                this.notifyNoFileUploaded();
            })

    }

    submitNewPicture() {
        let fileService = new FileService();
        let image = document.getElementById("imageInput");

        fileService.uploadImage(image.files[0])
            .then((res) => {
                this.setState({
                    Picture : res.data.filePath.filename
                });
                this.notifyPictureUploaded();
            })
            .catch((err) => {
                console.error(err);
                this.notifyNoFileUploaded();

            })


    }

    registerEvent(){
        if(this.formValidation() && this.checkDate()){
            if (!(validateEmail(this.state.ContactEmail))) {
                this.notifyUnvalidEmail();
            } else if (!(validatePhone(this.state.ContactPhone))) {
                this.notifyUnvalidPhone();
            } else {
                console.log(this.state);

                let day = this.state.date.getDate();
                let month = this.state.date.getMonth() + 1;
                let year = this.state.date.getFullYear();
                let hour = this.state.dateChosenHour;
                let min = this.state.dateChosenMin;
                if (day < 10) {
                    day = "0" + day
                }
                if (month < 10) {
                    month = "0" + month
                }
                let date = year + "-" + month + "-" + day + " " + hour + ":" + min + ":00";

                eventService
                    .updateEvent(this.props.match.params.id, this.state.Name, date, this.state.Description, this.state.Place, this.state.Category, this.state.Artists, this.state.Tech, this.state.Hospitality, this.state.Personnel, this.state.Picture, this.state.Contract)
                    .catch(Error => console.log(Error));

                eventService
                    .deleteTicketsForEvent(this.props.match.params.id)
                    .then(() => this.updateById(this.props.match.params.id))
                    .catch(Error => console.log(Error));

                this.notifySuccess();
            }
        }
        else{
            if(!this.checkDate()){
                this.notifyDateFailure();
            }
            else{
                this.notifyFailure();
            }
        }
    }
    updateById(eventID){
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"]){
                if(this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0){
                    eventService
                        .addTicket(ticket.ticket_category_id, eventID, this.state[ticket.name + "TicketAmount"], this.state[ticket.name + "TicketPrice"])
                        .catch(Error => console.log(Error))
                }
            }
        });
        if(this.state.haveContactInfo) {
            eventService
                .updateContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, eventID)
                .then(() => window.location.href = "#/event/" + this.props.match.params.id)
                .catch(Error => console.log(Error));
        }
        else{
            eventService
                .addContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, eventID)
                .then(() => window.location.href = "#/event/" + this.props.match.params.id)
                .catch(Error => console.log(Error))
        }
    }
}

export default EditEvent;