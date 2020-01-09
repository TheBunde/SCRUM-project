import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import EventService from "../../../service/EventService";

import Navbar from '../../Navbar/Navbar'


class AddEvent extends Component{
    constructor(props){
        super(props);
        this.state ={
            FreeTicketBox: false,
            FreeTicketAmount: null,
            StandardTicketBox: false,
            StandardTicketAmount: null,
            VIPTicketBox: false,
            VIPTicketAmount: null,
            EarlyBirdTicketBox: false,
            EarlyBirdTicketAmount: null,
            GoldenCircleTicketBox: false,
            GoldenCircleTicketAmount: null

        };
        this.changeBox = this.changeBox.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
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
                <form>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               class = "form-control"
                               id = "nameInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Dato for arrangementet:</p>
                        <input type="text"
                               class = "form-control"
                               id = "dateInput"
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Beskrivelse for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="descriptionInput"
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Sted for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="placeInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               class = "form-control"
                               id = "artistInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Tech Riders:</p>
                        <input type="text"
                               class = "form-control"
                               id = "tech_ridersInput"
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Hospitality Riders:</p>
                        <input type="text"
                               className="form-control"
                               id="hospitality_ridersInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Nødvendig personell:</p>
                        <input type="text"
                               class = "form-control"
                               id = "personnelInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Bilde:</p>
                        <input type="text"
                               class = "form-control"
                               id = "pictureInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Kontrakt:</p>
                        <input type="text"
                               class = "form-control"
                               id = "contractInput"
                        />
                    </div>

                    <div id ="EventInputCheckboxes">
                        <p id = "EventInputLabels">Billettyper:</p>
                        <label id = "EventTicketLabels">Gratisbillett</label>
                        <input type ="checkbox"
                               id="FreeTicketBox"
                               name="FreeTicketAmount"
                               onChange={this.changeBox}
                        />
                        <label id = "EventTicketLabels">Standard billett</label>
                        <input type ="checkbox"
                               id="StandardTicketBox"
                               name="StandardTicketAmount"
                               onChange={this.changeBox}
                        />
                        <label id = "EventTicketLabels">VIP billett</label>
                        <input type ="checkbox"
                               id="VIPTicketBox"
                               name="VIPTicketAmount"
                               onChange={this.changeBox}
                        />
                        <label id = "EventTicketLabels">Early Bird billett</label>
                        <input type ="checkbox"
                               id="EarlyBirdTicketBox"
                               name="EarlyBirdTicketAmount"
                               onChange={this.changeBox}
                        />
                        <label id = "EventTicketLabels">Golden Circle billett</label>
                        <input type ="checkbox"
                               id="GoldenCircleTicketBox"
                               name="GoldenCircleTicketAmount"
                               onChange={this.changeBox}
                        />
                    </div>

                    <div id="EventTicketAmount">
                        <input type ="number"
                               id ="FreeTicketAmount"
                               class ="form-control"
                               placeholder = "Antall gratisbilletter"
                               value = {this.state.FreeTicketAmount}
                               disabled={!this.state.FreeTicketBox}
                               onChange={this.changeAmount}
                        />
                        <input type="number"
                               id ="StandardTicketAmount"
                               className="form-control"
                               placeholder="Antall standard billetter"
                               value={this.state.StandardTicketAmount}
                               disabled={!this.state.StandardTicketBox}
                               onChange={this.changeAmount}
                        />
                        <input type="number"
                               id="VIPTicketAmount"
                               className="form-control"
                               placeholder="Antall VIP billetter"
                               value={this.state.VIPTicketAmount}
                               disabled={!this.state.VIPTicketBox}
                               onChange={this.changeAmount}
                        />
                        <input type="number"
                               id="EarlyBirdTicketAmount"
                               className="form-control"
                               placeholder="Antall Early Bird billetter"
                               value={this.state.EarlyBirdTicketAmount}
                               disabled={!this.state.EarlyBirdTicketBox}
                               onChange={this.changeAmount}
                        />
                        <input type="number"
                               id="GoldenCircleTicketAmount"
                               className="form-control"
                               placeholder="Antall Golden Circle billetter"
                               value={this.state.GoldenCircleTicketAmount}
                               disabled={!this.state.GoldenCircleTicketBox}
                               onChange={this.changeAmount}
                        />
                    </div>

                    <div id = "EventInputButton">
                        <button type="button" className="btn btn-outline-primary btn-lg" onClick={this.registerEvent}>
                            Registrer arrangement
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    registerEvent(){
        var name = document.getElementById("nameInput").value;
        var date = document.getElementById("dateInput").value;
        var description = document.getElementById("descriptionInput").value;
        var place = document.getElementById("placeInput").value;
        var artists = document.getElementById("artistInput").value;
        var tech_riders = document.getElementById("tech_ridersInput").value;
        var hospitality_riders = document.getElementById("hospitality_ridersInput").value;
        var personnel = document.getElementById("personnelInput").value;
        var picture = document.getElementById("pictureInput").value;
        var contract = document.getElementById("contractInput").value;

        var freeTicket = document.getElementById("FreeTicketBox").checked;
        var freeTicketAmount = document.getElementById("FreeTicketAmount").value;
        var standardTicket = document.getElementById("StandardTicketBox").checked;
        var standardTicketAmount = document.getElementById("StandardTicketAmount").value;
        var VIPTicket = document.getElementById("VIPTicketBox").checked;
        var VIPTicketAmount = document.getElementById("VIPTicketAmount").value;
        var earlyBirdTicket = document.getElementById("EarlyBirdTicketBox").checked;
        var earlyBirdTicketAmount = document.getElementById("EarlyBirdTicketAmount").value;
        var goldenCircleTicket = document.getElementById("GoldenCircleTicketBox").checked;
        var goldenCircleTicketAmount = document.getElementById("GoldenCircleTicketAmount").value;

        /*console.log(name + " \n" + date + " \n" + artists + " \n" + riders + " \n" + staff + "\n" + picture + " \n" + contract + " \n"
            + freeTicket + "\n" + freeTicketAmount +"\n" + standardTicket +"\n" + standardTicketAmount + " \n"
            + VIPTicket +"\n" + VIPTicketAmount + " \n" + earlyBirdTicket +"\n" + earlyBirdTicketAmount + " \n"
            + goldenCircleTicket + "\n" + goldenCircleTicketAmount)*/

        /*EventService
            .addEvents(name, date, description, place, artists, tech_riders, hospitality_riders, personnel, picture)
            .catch(Error => console.log(Error))*/

    }
}

export default AddEvent;