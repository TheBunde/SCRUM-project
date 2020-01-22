import React, { Component } from "react";
import NavbarMainPage from "../../Navbar/NavbarMainPage";
import Footer from "../../Footer/Footer";
import "../../../css/NotFound.css";

class NotFound extends Component {
    render() {
        return(
            <div>
                <NavbarMainPage/>
                <div id={"NotFoundMain"}>
                    <h1>404 Not Found</h1>
                    <img src={"https://media.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif"} alt={"GIF"}/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default NotFound;
