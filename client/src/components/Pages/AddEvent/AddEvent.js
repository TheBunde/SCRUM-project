import React, {Component} from 'react';
import "../../../css/AddEvent.css"

import Navbar from '../../Navbar/Navbar'


class AddEvent extends Component{

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
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               class = "form-control"
                               id = "artistInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Riders:</p>
                        <input type="text"
                               class = "form-control"
                               id = "ridersInput"
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Nødvendig personell:</p>
                        <input type="text"
                               class = "form-control"
                               id = "staffInput"
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
                        <label id = "EventTicketLabels">Gratis billett</label>
                        <input type ="checkbox"
                               id="FreeTicketBox"
                        />
                        <label id = "EventTicketLabels">Standard billett</label>
                        <input type ="checkbox"
                               id="StandardTicketBox"
                        />
                        <label id = "EventTicketLabels">VIP billett</label>
                        <input type ="checkbox"
                               id="VIPTicketBox"
                        />
                        <label id = "EventTicketLabels">Early Bird billett</label>
                        <input type ="checkbox"
                               id="EarlyBirdTicketBox"
                        />
                        <label id = "EventTicketLabels">Golden Circle billett</label>
                        <input type ="checkbox"
                               id="GoldenCircleTicketBox"
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
        var artists = document.getElementById("artistInput").value;
        var riders = document.getElementById("ridersInput").value;
        var staff = document.getElementById("staffInput").value;
        var picture = document.getElementById("pictureInput").value;
        var contract = document.getElementById("contractInput").value;
        var freeTicket = document.getElementById("FreeTicketBox").checked;
        var standardTicket = document.getElementById("StandardTicketBox").checked;
        var VIPTicket = document.getElementById("VIPTicketBox").checked;
        var earlyBirdTicket = document.getElementById("EarlyBirdTicketBox").checked;
        var goldenCircleTicket = document.getElementById("GoldenCircleTicketBox").checked;

        console.log(name + " \n" + date + " \n" + artists + " \n" + riders + " \n" + staff + "\n" + picture + " \n" + contract + " \n"
            + freeTicket + "\n" + standardTicket + " \n" + VIPTicket + " \n" + earlyBirdTicket + " \n" + goldenCircleTicket)
    }
}

export default AddEvent;