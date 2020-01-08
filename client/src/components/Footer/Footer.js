import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component<> {
  render() {  
    return (

        <div>
            <div id="Footer">
                <a className="navbar-brand" href="#/about"><h5>Om</h5></a>
                <a className="navbar-brand" href="mailto:noreply.harmoni@gmail.com?Subject=Hello%20again">
                    <h5>Kontakt</h5></a>
            </div>

        </div>
    )


  }
}

export default Footer;