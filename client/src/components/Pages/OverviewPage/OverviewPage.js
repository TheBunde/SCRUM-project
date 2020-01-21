import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';
import "../../../img/concert.jpg"
import Navbar from '../../Navbar/Navbar'
import {UserService} from "../../../service/UserService";
import Footer from '../../Footer/Footer';
import {auth, authenticate} from "../../../service/UserService";


const history = createHashHistory();


class OverviewPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user : {},
            user_id: -1
        }
    }

    getUserID(){
        console.log(this.state.user.user_id);
    }

    componentDidMount() {
        authenticate();
        console.log(auth.user_id);
        let userService = new UserService();
        userService.getUser(auth.user_id)
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
                <div id="OverviewDiv">

                <div id="overviewPageCardContainer">

                    <div id="overviewPageCardContent" className="card overview">
                        <div className="card-body">
                            <div id="overviewPageCardTitle">
                                <h5 className="card-title">Legg til arrangement</h5>
                            </div>
                            <div id="overviewPageCardText">
                                <p className="card-text">Legg til de eventene du måtte ønske.</p>
                            </div>
                            <div id="overviewPageCardBtn">
                                <button className="btn btn-outline-primary" onClick={this.addEvent} role="button">Legg til arrangement</button>
                            </div>
                        </div>
                    </div>

                    <div id="overviewPageCardContent" className="card overview">
                        <div className="card-body">
                            <div id="overviewPageCardTitle">
                                <h5 className="card-title">Se alle eventer</h5>
                            </div>
                            <div id="overviewPageCardText">
                                <p className="card-text">Få en oversikt over alle dine arrangementer.</p>
                            </div>
                            <div id="overviewPageCardBtn">
                                <button className="btn btn-outline-success" onClick={this.seeEvents} role="button">Se alle arrangement</button>
                            </div>
                        </div>
                    </div>

                    <div id="overviewPageCardContent" className="card overview">
                        <div className="card-body">
                            <div id="overviewPageCardTitle">
                                <h5 className="card-title">Vis profil</h5>
                            </div>
                            <div id="overviewPageCardText">
                                <p className="card-text">Vil du endre profilen din kan du gjøre det her.</p>
                            </div>
                            <div id="overviewPageCardBtn">
                                <button className="btn btn-outline-warning" onClick={() => this.seeProfile(auth.user_id)}  role="button">Vis profil</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
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