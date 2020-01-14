import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';
import "../../../img/concert.jpg"
import Navbar from '../../Navbar/Navbar'
import {ProfileService} from "../../../service/ProfileService";
import Footer from '../../Footer/Footer'
const history = createHashHistory();

class OverviewPage extends Component{

    constructor(props) {
        super(props);
        this.state = {user_id: 9}

    }

    componentDidMount() {
        let profileService = new ProfileService();
        profileService.getUser(this.state.user_id)
            .then(user => {

                    this.setState({
                        user: user
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            });
        console.log("SE ME " + this.state.user)
    };

    render() {

        return (
            <div class="pageSetup">
                <Navbar/>


                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 id={"jumbotronTitle"} className="display-4">Skap harmoni.</h1>


                        <p className="lead"></p>
                    </div>
                </div>

                <div className={"cardsContainer"}>

                <div className="card overview">
                    <div className="card-body">
                        <h5 className="card-title">Legg til arrangement</h5>
                        <p className="card-text">Legg til de eventene du måtte ønske.</p>
                        <button className="btn btn-outline-primary" onClick={this.addEvent} role="button">Legg til arrangement</button>
                    </div>
                </div>

                <div className="card overview">
                    <div className="card-body">
                        <h5 className="card-title">Se alle eventer</h5>
                        <p className="card-text">Få en oversikt over alle dine arrangementer.</p>
                        <button className="btn btn-outline-success" onClick={this.seeEvents} role="button">Se alle arrangement</button>
                    </div>
                </div>

                <div className="card overview">
                    <div className="card-body">
                        <h5 className="card-title">Vis profil</h5>
                        <p className="card-text">Vil du endre profilen din kan du gjøre det her.</p>
                        <button className="btn btn-outline-warning" onClick={() => this.seeProfile(this.state.user.user_id)} role="button">Vis profil</button>
                    </div>
                </div>

            </div>

            <button id={"logoutBtn"} type="button" className="btn btn-dark" onClick={this.logOut}>Logg ut</button>

                <Footer />
            </div>
        );
    }



    addEvent(){
        history.push("/overview/addEvent")
    }

    seeEvents(){
        history.push("/event")
    }

    seeProfile(id){
        console.log("SE ME ");

        history.push("/profile/" + id)
    }

    logOut(){
        history.push("/")
    }
}

export default OverviewPage;