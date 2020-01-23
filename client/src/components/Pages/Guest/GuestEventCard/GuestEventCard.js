import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"


class GuestEventCard extends Component {
    render(){
        return (
            <div>

                <a href = {"#/event/public/" + this.props.id}>
                    <div className="card bg-dark text-white guestEventCard" id="guestEventCardCard">
                        <img className="card-img guestCardImage" src={"http://localhost:8080/image/" + this.props.img_url} alt="Card image"/>
                            <div className="card-img-overlay guestCardOverlay">
                                <h5 className="card-title eventName">{this.props.name}</h5>
                                <p className="card-text">{this.props.place}</p>
                            </div>
                    </div>
                </a>
            </div>

        )
    }
}

export default GuestEventCard;