import axios from 'axios';
//let ipAdress = "10.24.3.122";
let ipAdress = "localhost";

export class event {
    constructor(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        this.name = name;
        this.date = date;
        this.place = place;
        this.artists = artists;
        this.tech_rider = tech_rider;
        this.hospitality_rider = hospitality_rider;
        this.personnel = personnel;
        this.img_url = img_url;
        this.description = description;
        this.contract = contract;
    }
}

class EventService{

    uploadImage(file) {
        return axios.post("http://" + ipAdress + ":8080/filesUpload", file);
    }

    addEvents(name, date, description, place, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let newEvent = {name: name, date: date, description: description, place: place, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        return axios.post("http://" + ipAdress + ":8080/event", newEvent).then(response => response.data);
    }

    getAllEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/all").then(response => response.data);
    }

    getAllArchived(){
        return axios.get("http://" + ipAdress + ":8080/event/archived").then(response => response.data);
    }

    getNonFiledEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/nonfiled").then(response => response.data);
    }
    getEventById(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/" + eventID).then(response => response.data);
    }

    deleteEvent(eventID){
        console.log("Inne i delete metode")
        return axios.delete("http://" + ipAdress + ":8080/event/" + eventID).then(response => response.data);
    }

    getCategories(){
        return axios.get("http://" + ipAdress + ":8080/categories").then(response => response.data);
    }

    getTicket(){
        return axios.get("http://" + ipAdress + ":8080/tickets").then(response => response.data);
    }

    addTicket(ticketID, eventID, amount){
        let newTicket = {ticketID: ticketID, eventID: eventID, amount: amount};
        return axios.post("http://" + ipAdress + ":8080/tickets", newTicket).then(response => response.data)
    }

    addCategory(eventID, categoryID){
        let newCategory = {eventID: eventID, categoryID: categoryID};
        return axios.post("http://" + ipAdress + ":8080/categories", newCategory).then(response => response.data)
    }

    addContactInfo(name, phone, email, eventID){
        let newContactInfo = {name: name, phone: phone, email: email, eventID: eventID};
        return axios.post("http://" + ipAdress + ":8080/contactinfo", newContactInfo).then(response => response.data)
    }

    updateFiled(eventID){
        console.log(eventID + "!!!");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/archived", eventID).then(response => response.data);
    }

    getCategoryFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/category/" + eventID).then(response => response.data[0]);
    }

    getContactinfoForEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/contactinfo/" + eventID).then(response => response.data[0]);
    }

    getTicketById(ticketID){
        return axios.get("http://" + ipAdress + ":8080/tickets/" + ticketID).then(response => response.data[0]);
    }

    getTicketFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/tickets/" + eventID).then(response => response.data);
    }
}

export let eventService = new EventService();
