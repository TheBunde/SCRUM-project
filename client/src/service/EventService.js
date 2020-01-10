import axios from 'axios';

export class event {
    constructor(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url){
        this.name = name;
        this.date = date;
        this.place = place;
        this.artists = artists;
        this.tech_rider = tech_rider;
        this.hospitality_rider = hospitality_rider;
        this.personnel = personnel;
        this.img_url = img_url;
        this.description = description;
    }
}

class EventService{

    addEvents(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url){
        let newEvent = new event(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url);
        console.log(newEvent);
        return axios.post("http://localhost:8080/event", newEvent).then(response => response.data);
    }

    getEvents(){
        return axios.get("http://localhost:8080/event/").then(response => response.data);
    }

    getEventById(eventID){
        return axios.get("http://localhost:8080/event/" + eventID).then(response => response.data);
    }

    getCategories(){
        return axios.get("http://localhost:8080/categories").then(response => response.data);
    }

    getTicket(){
        return axios.get("http://localhost:8080/tickets").then(response => response.data);
    }
}

export let eventService = new EventService();
