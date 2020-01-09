import axios from 'axios';
import event from '../components/Pages/EventPage/EventPage.js';

class EventService{

    addEvents(event_id, name, date, description, place, artists, tech_rider, hospitality_rider, personnel, category_id, filed, pending, img_url){
        let newEvent = new event(event_id, name, date, description, place, artists, tech_rider, hospitality_rider, personnel, category_id, filed, pending, img_url);
        return axios.post("http://localhost:8080/event/", newEvent).then(response => response.data);
    }

    getEvents(){
        return axios.get("http://localhost:8080/event/").then(response => response.data);
    }

    getEventById(eventID){
        return axios.get("http://localhost:8080/event/" + event_id).then(response => response.data);
    }
    
}


export default EventService;
