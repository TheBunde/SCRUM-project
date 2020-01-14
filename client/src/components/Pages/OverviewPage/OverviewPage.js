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
                        <h1 id={"jumbotronTitle"} className="display-4">Create Harmony.</h1>


                        <p className="lead"></p>
                    </div>
                </div>

                <div className={"cardsContainer"}>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Legg til arrangement</h5>
                        <p className="card-text">Legg til de eventene du måtte ønske.</p>
                        <a className="btn btn-outline-primary" href="/#/overview/addEvent" role="button">Legg til arrangement</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Se alle eventer</h5>
                        <p className="card-text">Få en oversikt over alle dine arrangementer.</p>
                        <a className="btn btn-outline-success" href={"/#/event"} role="button">Se alle arrangement</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Vis profil</h5>
                        <p className="card-text">Vil du endre profilen din kan du gjøre det her.</p>
                        <a className="btn btn-outline-warning" href="#" role="button">Vis profil</a>
                    </div>
                </div>



            </div>

            <button id={"logoutBtn"} type="button" className="btn btn-dark">Logg ut</button>




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