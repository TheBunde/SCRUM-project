import React, {Component} from 'react'; 

import Navbar from '../../Navbar/Navbar'

class MainPage extends Component{
    
    render() {
        return (
            <div>
                <Navbar />

                <div id="MainPageDiv">
                    <h1> Harmoni </h1>
                    <button type="button" className="btn btn-primary">log in</button>
                    <button type="button" className="btn btn-secondary">register</button>
                </div>

            </div>
        );
    }
}

export default MainPage;