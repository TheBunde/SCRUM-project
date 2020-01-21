import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"


class GuestEventCard extends Component {
    render(){
        return (
            <div>
                <a onClick={() => window.location.href = "#/event/public/" + this.props.id}>
                    <div className={"card guestEventCard"}>
                        <img className="card-img-top" src={"http://localhost:8080/image/" + this.props.img_url} alt="Card image cap"/>
                            <div className="card-body">
                                <p className="card-text eventName">{this.props.name}</p>
                                <p className={"card-text eventPlace"}>{this.props.place}</p>
                            </div>
                    </div>
                </a>
            </div>

        )
    }
}

export default GuestEventCard;