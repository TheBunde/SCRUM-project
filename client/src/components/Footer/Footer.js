import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component<> {
  render() {  
    return (
        <div id="Footer">
            <nav class="navbar navbar-expand-lg navbar-dark" id="FooterContainer">
                <a class="navbar-brand" href="#/about"><h5>Om</h5></a>
                <a class="navbar-brand" href="#/terms"><h5>Kontakt</h5></a>
            </nav>
        </div>
    )
  }
}

export default Footer;