import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"


class GuestEventCard extends Component {
    render(){
        return (
            <div>
            <div className="card bg-dark text-white guestEventCard">
                <img className="card-img" src={"http://localhost:8080/image/" + this.props.img_url} alt="Card image"/>
                    <div className="card-img-overlay">

                        <h6 className="card-title">{this.props.name}</h6>
                        <p className="card-text">{this.props.place}</p>


                    </div>
            </div>

            </div>

        )
    }
}

export default GuestEventCard;