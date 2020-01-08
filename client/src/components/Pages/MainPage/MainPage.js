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
                    <button type="button" className="btn btn-primary">log in</button>

                    <div id="MainPageButtons">
                        <button type="button" className="btn btn-outline-primary btn-lg">Logg inn</button>
                    </div>
                    <div id="MainPageButtons">
                        <button type="button" className="btn btn-outline-secondary btn-lg">Registrer ny bruker</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default MainPage;