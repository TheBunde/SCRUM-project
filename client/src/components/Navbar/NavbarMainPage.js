import React, {Component} from 'react';

/*
* @class NavbarMainPage
* The component of the navbar showing only when not logged in, or by showing the guest-pages.
* These pages are the guestEventView showing the eventinfo, guestMainPage being the firstpage with an list of events,
* and the calendar showing when not logged in.
*/
class NavbarMainPage extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#/"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = "#/">Arrangementer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = "#/calendar">Kalender</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = {"#/portal"}>Arrangørportal</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavbarMainPage;
