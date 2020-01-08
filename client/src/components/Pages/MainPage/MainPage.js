import React, {Component} from 'react'; 
import "../../../css/MainPage.css"

import Navbar from '../../Navbar/Navbar'


class MainPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />
                <div id="MainPageDiv">
                    <h1> Harmoni </h1>
                    <button id="MainPageLogInbtn" type="button" className="btn btn-outline-dark btn-lg" onClick={this.handleLogIn}>Log in</button>
                    <button id="MainPageRegisterbtn" type="button" className="btn btn-outline-dark btn-lg">Register</button>
                </div>

            </div>
        );
    }

}

export default MainPage;