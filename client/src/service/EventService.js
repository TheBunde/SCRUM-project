import axios from 'axios';
import {authConfig} from "./UserService.js"
//let ipAdress = "10.24.3.122";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";
//let ipAdress = "10.22.2.85";

export class event {
    constructor(name, date, description, place, category_id, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        this.name = name;
        this.date = date;
        this.place = place;
        this.category_id = category_id;
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

    addEvents(name, date, description, place, categoryID, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let newEvent = {name: name, date: date, description: description, place: place, categoryID: categoryID, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        return axios.post("http://" + ipAdress + ":8080/event", newEvent).then(response => response.data);
    }

    getAllEvents(){
        console.log("Heyo bro")
        return axios.get("http://" + ipAdress + ":8080/event/all", authConfig).then(response => response.data);
    }

    getAllArchived(){
        console.log("bruh")
        return axios.get("http://" + ipAdress + ":8080/event/archived", authConfig).then(response => response.data);
    }

    getAllActive(){
        console.log("jærræ")
        return axios.get("http://" + ipAdress + ":8080/event/active", authConfig).then(response => response.data);
    }

    getNonFiledEvents(){
        console.log("Yes man")
        return axios.get("http://" + ipAdress + ":8080/event/nonfiled", authConfig).then(response => response.data);
    }
    getEventById(eventID){
        console.log("Kanskje d ja")
        return axios.get("http://" + ipAdress + ":8080/event/" + eventID, authConfig).then(response => response.data);
    }

    deleteEvent(eventID){
        console.log("Kult man. Delete masse")
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

    updateEvent(eventID, name, date, description, place, categoryID, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let eventInfo = {name: name, date: date, description: description, place: place, categoryID: categoryID, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/edit", eventInfo).then(response => response.data)
    }

    updateContactInfo(name, phone, email, eventID){
        let contactInfo = {name: name, phone: phone, email: email};
        return axios.put("http://" + ipAdress + ":8080/contactInfo/" + eventID, contactInfo).then(response => response.data)
    }

    updateEventTicket(ticketID, eventID, amount){
        let ticketInfo = {ticketID: ticketID, amount: amount};
        return axios.put("http://" + ipAdress + ":8080/tickets/" + eventID, ticketInfo).then(response => response.data)
    }
}

export let eventService = new EventService();
