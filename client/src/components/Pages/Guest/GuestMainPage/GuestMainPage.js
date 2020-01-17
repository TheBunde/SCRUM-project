import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"


class GuestMainPage extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <div id="GuestMainPageContainer">
                    <button type="button" class="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/portal"}>Arrangørportal</button>
                    <button type="button" class="btn btn-outline-dark btn-lg" onClick={() => window.location.href="#/event/public/162"}>Gjestevisning av arrangementer</button>
                </div>
            </div>
        )
    }
}

export default GuestMainPage;
