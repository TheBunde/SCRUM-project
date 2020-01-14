import React, {Component} from 'react';
import '../../css/Navbar.css';
import $ from 'jquery';
import {auth, authenticate} from "../../service/UserService";


/*Changing ml-auto to mr-auto will change the placement of the navbar-collapse items to the left besides the logo/name to the left on the Navbar */

class Navbar extends Component {
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
                            <li className="nav-item" id={"adminUsersLink"}>
                                <a className="nav-link" onClick={() => window.location.href = "#/admin/users"}>Brukere</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" onClick={() => window.location.href = "#/overview"}>Oversikt</a>
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
                            <li class="nav-item">
                                <a class="nav-link" onClick={() => this.signOut()}>Logg ut</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

class NavbarMainPage extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#"><h1>Harmoni</h1></a>
                </nav>
            </div>
        );
    }
}

export default Navbar;
export {NavbarMainPage};


/*
* First type of navbar, in which closes the collapse by redirecting/clicking a button in the collapse
* The problem is by clicking on one of the buttons if the screen is larger than the collapse meny showing

<div>
                <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
                    <a class="navbar-brand" href="#/overview"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto"> 
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/overview"} data-toggle="collapse" data-target="#navbarSupportedContent">Oversikt</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Arrangementer
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                <a class="dropdown-item" onClick={()=> window.location.href="#/event"} data-toggle="collapse" data-target="#navbarSupportedContent">Alle arrangementer</a>
                                <a class="dropdown-item" onClick={()=> window.location.href="#/overview/addEvent"} data-toggle="collapse" data-target="#navbarSupportedContent">Legg til arrangement</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/"} data-toggle="collapse" data-target="#navbarSupportedContent">Logg ut</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>


            * This one is with forms for fast login in the navbar

            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#/overview"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto"> 
                        <li class="nav-item">
                            <input type="email" class="form-control" id="NavbarInputEmail" aria-describedby="NavbarEmail" placeholder="E-post" />
                        </li>
                        <li class="nav-item">
                            <input type="password" class="form-control" id="NavbarInputPassword" aria-describedby="NavbarPassword" placeholder="Passord" />
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/"}>Logg inn</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>

 */