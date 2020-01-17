import React, {Component} from 'react';

class NavbarMainPage extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#/overview"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   onClick={() => window.location.href = "#/"}>Arrangementer</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   onClick={() => window.location.href = "#/portal"}>Arrangørportal</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavbarMainPage;