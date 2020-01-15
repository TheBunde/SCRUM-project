import React, {Component} from 'react';

import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import '../../../css/About.css'



// About, will be called by the "om" link in the footer

class About extends Component{
    
    render() {
        return (
            <div class="pageSetup">
                <Navbar />
                <div id='main'>
                    <h5>Harmoni</h5>
                    <p id="aboutText">
                        Harmoni er en webaplikasjon som har til formål å forenkle informasjonsdeling for dem som arrangerer arrangementer. Systemet er koblet
                        opp mot en database som gjør at alle arrangører får samme oppdaterte informasjon til enhver tid og hvor som helst med nett. Både på PC og mobil.
                        Kos deg med oversikt og kommunikasjon.
                    </p>
                    <div id="links">
                        <div id="link">
                            <a id="logos" href="https://www.sukkerhuset.no/">
                                <img alt="Sukkerhuset" src="https://uploads-ssl.webflow.com/5de46d09d41c9b2ee3cf98ab/5de78539524e509d2af37698_favicon-new.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                        <div id="link">
                            <a id="logos" href="https://www.facebook.com/Sukkerhuset/">
                                <img alt="Facebook logo" src="https://www.facebook.com/images/fb_icon_325x325.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                        <div id="link">
                            <a id="logos" href="https://www.instagram.com/sukkerhuset/">
                                <img alt="Istagram logo" src="http://vollgard.no/wp-content/uploads/2016/02/instagram-logo-vector-png-7-300x294.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                    </div>

                </div>

                <div id="aboutEventViewMap">
                    <h1>Halla</h1>
                    <eventViewMap />
                </div>

                <Footer/>
            </div>
        );
    }
}

export default About;