import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import '../../../css/About.css'

class About extends Component{
    
    render() {
        return (
            <div class="pageSetup">
                <Navbar />
                <div>
                    <h5>Harmoni</h5>
                    <p>
                        Harmoni er en webaplikasjon som har til formål å forenkle informasjonsdeling for dem som arrangerer arrangementer. Systemet er koblet
                        opp mot en database som gjør at alle arrangører får samme oppdaterte informasjon til enhver tid og hvor som helst med nett. Både på PC og mobil.
                        Kos deg med oversikt og kommunikasjon.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;