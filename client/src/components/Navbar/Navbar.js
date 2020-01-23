import React, { Component } from "react";
import "../../css/Navbar.css";
import $ from "jquery";
import { auth, authenticate } from "../../service/auth";
import UserService from "../../service/UserService";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

/**
* Comment about the Bootstrap-alignment
*   Changing ml-auto to mr-auto will change the placement of the navbar-collapse items to the left besides the logo/name to the left on the Navbar 
*/

/**
 * Navbar component
 * @class Navbar
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_id: -1
    };
  }


  /**
  * This method fetches information about the user, which is then used further on by providing your profile picture,
  profile name and some options in the navbar regarding your user profile.
  */
  someFn() {
    this.props.getUser(this.state.user);
  }
  
  /**
  * This method signs you; It redirects you to the login-page and removes the token stored in localStorage
  */
  signOut = () => {
    window.localStorage.removeItem("token");
    window.location.hash = "/login";
  };

  /**
  * This gives render() instructions about what to do while mounting the component for the first time,
  * and because the navbar is conditional rendered providing only admins admin-functionality, this method authenticates to check if admin, then fetch the user information.
  */
  componentDidMount() {
    let show = document.getElementById("adminUsersLink");
    let style = window.getComputedStyle(show);
    authenticate();
    if (auth.role == "admin") {
      show.style.display = "block";
    } else {
      show.style.display = "none";
    }
    let userService = new UserService();
    userService
      .getUser(auth.user_id)
      .then(user => {
        this.setState({
          user: user
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
  * The method rendering the component, what happens when the component is called upon by index.js, by an user loading the given url using this component. 
  */
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
          <a class="navbar-brand" href="#/overview">
            <h1>Harmoni</h1>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Forside
                </a>
              </li>

              <li className="nav-item" id={"adminUsersLink"}>
                <a className="nav-link" href="#/admin/users">
                  Rediger brukere
                </a>
              </li>

              <li className="nav-item" id={"adminUsersLink"}>
                <a className="nav-link" href="#/calendar">
                  Kalender
                </a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Arrangementer
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  id="navbarDropdown"
                >
                  <a class="dropdown-item" href="#/event">
                    Alle arrangementer
                  </a>
                  <a class="dropdown-item" href="#/overview/addEvent">
                    Legg til arrangement
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    id="navProfile"
                    alt="pb"
                    src={
                      this.state.user.profile_photo === null ||
                      this.state.user.profile_photo === ""
                        ? "https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                        : "http://" + ipAdress + ":8080/image/" +
                          this.state.user.profile_photo
                    }
                    width="30"
                    height="30"
                  />
                  {this.state.user.name}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  id="navbarDropdown"
                >
                  <a
                    className="dropdown-item"
                    href={"#/profile/" + auth.user_id}
                  >
                    Min profil
                  </a>
                  <a
                    className="dropdown-item"
                    href={"#/profile/" + auth.user_id + "/edit"}
                  >
                    Rediger profil
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href={"#/about"}>
                    Om
                  </a>
                  <a
                    className="dropdown-item"
                    href="mailto:noreply.harmoni@gmail.com?Subject=Hello%20again"
                  >
                    Kontakt oss
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    onClick={() => this.signOut()}
                    href="#"
                  >
                    Logg ut
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
