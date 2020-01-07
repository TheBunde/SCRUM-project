import React, {Component} from 'react'; 

class MainPage extends Component{
    
    render() {
        return (
            <div>

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