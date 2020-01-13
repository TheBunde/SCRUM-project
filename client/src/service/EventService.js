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

class ticket{
    constructor(ticketID, eventID, number){
        this.ticketID = ticketID;
        this.eventID = eventID;
        this.number = number;
    }
}

class EventService{

    addEvents(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url){
        let newEvent = new event(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url);
        return axios.post("http://localhost:8080/event", newEvent).then(response => response.data);
    }

    getAllEvents(){
        return axios.get("http://localhost:8080/event/all").then(response => response.data);
    }
    getNonFiledEvents(){
        return axios.get("http://localhost:8080/event/nonfiled").then(response => response.data);
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

    addTicket(ticketID, eventID, number){
        let newTicket = new ticket(ticketID, eventID, number);
        return axios.post("http://localhost:8080/tickets", newTicket).then(response => response.data)
    }
}

export let eventService = new EventService();
