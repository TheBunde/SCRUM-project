import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"


class GuestEventCard extends Component {
    render(){
        return (
            <div className="card bg-dark text-white guestEventCard">
                <img className="card-img" src={"http://localhost:8080/image/" + this.props.img_url} alt="Card image"/>
                    <div className="card-img-overlay">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.artists}</p>
                        <p className="card-text">{this.props.place}</p>
                        <p className={"card-text"}>{this.props.date}</p>
                    </div>
            </div>
        )
    }
}

export default GuestEventCard;