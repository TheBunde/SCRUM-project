import React, {Component} from 'react';
import '../../css/Navbar.css';


class Navbar extends Component{
    
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/Entreprenør"} data-toggle="collapse" data-target="#navbarSupportedContent">Ivar Nilsen Entreprenør AS<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/Eiendom"} data-toggle="collapse" data-target="#navbarSupportedContent"href="#/Eiendom">Ivar Nilsen Eiendom AS</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#/Prosjekt" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Prosjekter
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                <a class="dropdown-item" onClick={()=> window.location.href="#/prosjekt/1"} data-toggle="collapse" data-target="#navbarSupportedContent">Nordby utvikling</a>
                                <a class="dropdown-item" onClick={()=> window.location.href="#/prosjekt/2"} data-toggle="collapse" data-target="#navbarSupportedContent">Såstad</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/Kontakt"} data-toggle="collapse" data-target="#navbarSupportedContent">Kontakt oss</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;