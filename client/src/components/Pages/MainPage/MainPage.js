import React, {Component} from 'react'; 

class MainPage extends Component{
    
    render() {
        return (
            <div>

                <div id="MainPageDiv">
                    <h1> Harmoni </h1>
                    <button type="button" className="btn btn-primary">log in</button>
                    <a className="btn btn-primary" href="/#/register" role="button">Registrer bruker</a>
                </div>

            </div>
        );
    }
}

export default MainPage;