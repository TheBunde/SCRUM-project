import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'
import { createHashHistory } from 'history';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const history = createHashHistory();

class GuestEventView extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    formatDate(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);
        let hours = tempDate.slice(11, 13);
        let minutes = tempDate.slice(14, 16);

        return date + "-" + month + "-" + year + " " + hours + ":" + minutes;
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default GuestEventView;


