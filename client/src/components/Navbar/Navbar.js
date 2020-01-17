import React, {Component} from 'react';
import '../../css/Navbar.css';
import $ from 'jquery';
import {auth, authenticate} from "../../service/UserService";
import {ProfileService} from "../../service/ProfileService";


/*Changing ml-auto to mr-auto will change the placement of the navbar-collapse items to the left besides the logo/name to the left on the Navbar */

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {},
            user_id: -1
        }
    }

    signOut = () => {
        window.localStorage.removeItem("token");
        window.location.hash = "/login";
    };

    componentDidMount() {
        let show = document.getElementById("adminUsersLink");
        let style = window.getComputedStyle(show);
        authenticate();
        if (auth.role == "admin") {
            show.style.display = "block";
        } else {
            show.style.display = "none";
        }
        let profileService = new ProfileService();
        profileService.getUser(auth.user_id)
            .then(user => {
                    this.setState({
                        user: user
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            });
    }

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
                        <ul class="navbar-nav ml-auto">

                            <li className="nav-item">
                                <a className="nav-link"
                                   onClick={() => window.location.href = "#/overview"}>Hovedside</a>
                            </li>

                            <li className="nav-item" id={"adminUsersLink"}>
                                <a className="nav-link" onClick={() => window.location.href = "#/admin/users"}>Rediger brukere</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    Arrangementer
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                    <a class="dropdown-item" onClick={() => window.location.href = "#/event"}>Alle
                                        arrangementer</a>
                                    <a class="dropdown-item"
                                       onClick={() => window.location.href = "#/overview/addEvent"}>Legg til
                                        arrangement</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    <img id="navProfile" alt="profilePic" src={this.state.user.profile_photo === null || this.state.user.profile_photo === "" ? "https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" : "http://localhost:8080/image/" + this.state.user.profile_photo}
                                         width="30" height="30"/>
                                         {this.state.user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                    <a className="dropdown-item"
                                       onClick={() => window.location.href = "#/profile/" + auth.user_id}>Min profil</a>
                                    <a className="dropdown-item"
                                    onClick={() => window.location.href = "#/profile/" + auth.user_id + "/edit"}>Rediger profil</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item"
                                       onClick={() => window.location.href = "#/about"}>Om</a>
                                    <a className="dropdown-item" href="mailto:noreply.harmoni@gmail.com?Subject=Hello%20again">
                                        Kontakt oss</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item"
                                       onClick={() => this.signOut()}>Logg ut</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;

