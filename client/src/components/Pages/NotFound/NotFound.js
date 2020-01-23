import React, { Component } from "react";
import NavbarMainPage from "../../Navbar/NavbarMainPage";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import "../../../css/NotFound.css";
import {auth, authenticate} from "../../../service/UserService";

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        authenticate();
        if (auth.authenticated) {
            this.setState({
                loggedIn : true
            })
        } else {
            this.setState({
                loggedIn : false
            })
        }
    }

    render() {
        return(
            <div>
                {this.state.loggedIn ? <Navbar /> : <NavbarMainPage />}
                <div id="pageSetup">
                    <div id={"NotFoundMain"}>
                        <h1>404 Not Found</h1>
                        <img src={"https://media.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif"} alt={"GIF"}/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default NotFound;
