import React, {Component} from 'react'; 
import "../../../css/MainPage.css"
import { createHashHistory } from 'history';

import Navbar from '../../Navbar/Navbar'

const history = createHashHistory();


class MainPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />
                <body background="mainPageBackground.jpg">
                <div id="MainPageDiv">
                    <h1 id="MainPageTitle"> Harmoni </h1>
                    <div id="MainPageBtnDiv">
                        <a id="MainPageButtons" type="button" className="btn btn-outline-dark btn-lg mr-5" href="#/login">Log in</a>
                        <a id="MainPageButtons" type="button" className="btn btn-outline-dark btn-lg" href="#/register">Register</a>
                    </div>

                </div>
                </body>


            </div>
        );
    }

}

export default MainPage;