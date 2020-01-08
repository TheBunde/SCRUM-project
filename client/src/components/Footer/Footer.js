import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component<> {
  render() {  
    return (
        <div id="Footer">
            <footer class="page-footer font-small blue pt-4">
                <div class="container-fluid text-center text-md-left">
                    <div class="row">
                    <div class="col-md-6 mt-md-0 mt-2">
                        <h5 class="text-uppercase">Sukkerhuset Kjeller & Scene</h5>
                        <p>Harmoni er en plattform utviklet for arrangementplanlegging for Sukkerhuset Kjeller & Scene. Her samles alt av informasjon rundt et arrangement. Dersom du trenger tilgang, eller har andre spørsmål, kontakt oss ved å trykke på linken til høyre!</p>
                    </div>
                    <hr class="clearfix w-100 d-md-none pb-3" />
                    <div class="col-md-3 mb-md-0 mb-2">
                    </div>
                    <div class="col-md-3 mb-md-0 mb-2">
                        <h5 class="text-uppercase">Links</h5>
                        <ul class="list-unstyled">
                        <li>
                            <a href="mailto:noreply.harmoni@gmail.com" class="sortTekst" id="FooterContact">Kontakt oss</a>
                        </li>
                        <li>
                            <a href="#!">Link 2</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="footer-copyright text-center py-3">
                    <a>© 2020 Copyright: SCRUM Team 5</a>
                </div>
            </footer>
        </div>
    )
  }
}

export default Footer;