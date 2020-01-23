import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


class CarouselItem extends Component {
    render(){
        return (
            <div>
                <a onClick={() => window.location.href = "#/event/public/" + this.props.id}>
                    <div className="card bg-dark text-white guestEventCard">
                        <img className="card-img guestCardImage" src={"http://" + ipAdress + ":8080/image/" + this.props.img_url} alt={this.props.name}/>
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