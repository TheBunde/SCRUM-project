import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import EventService from "../../../service/EventService.js"

class AdminEventPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount(){
        let eventService = new EventService();
        eventService.get
    }

    render(){
        return(
            
        )
    }
}