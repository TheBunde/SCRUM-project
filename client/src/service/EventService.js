import axios from 'axios';
import {authenticationHeader} from "./UserService";

//let ipAdress = "10.24.3.122";
let ipAdress = "localhost";
//let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


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
        console.log("Trying to add event");
        return axios.post("http://" + ipAdress + ":8080/event", newEvent, {headers: authenticationHeader()}).then(response => response.data);
    }

    getAllEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/all").then(response => response.data);
    }

    getAllArchived(){
        return axios.get("http://" + ipAdress + ":8080/event/archived", {headers: authenticationHeader()}).then(response => response.data);
    }

    getCancelled(){
        return axios.get("http://" + ipAdress + ":8080/event/cancelled", {headers: authenticationHeader()}).then(response => response.data);
    }

    getAllActive(){
        return axios.get("http://" + ipAdress + ":8080/event/active", {headers: authenticationHeader()}).then(response => response.data);
    }

    getNonFiledEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/nonfiled", {headers: authenticationHeader()}).then(response => response.data);
    }
    getEventById(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    deleteEvent(eventID){
        console.log("Inne i delete metode");
        return axios.delete("http://" + ipAdress + ":8080/event/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    getCategories(){
        return axios.get("http://" + ipAdress + ":8080/categories", {headers: authenticationHeader()}).then(response => response.data);
    }

    getTicket(){
        return axios.get("http://" + ipAdress + ":8080/tickets", {headers: authenticationHeader()}).then(response => response.data);
    }

    addTicket(ticketID, eventID, amount, price){
        let newTicket = {ticketID: ticketID, eventID: eventID, amount: amount, price: price};
        return axios.post("http://" + ipAdress + ":8080/tickets", newTicket, {headers: authenticationHeader()}).then(response => response.data)
    }

    addContactInfo(name, phone, email, eventID){
        let newContactInfo = {name: name, phone: phone, email: email, eventID: eventID};
        return axios.post("http://" + ipAdress + ":8080/contactinfo", newContactInfo, {headers: authenticationHeader()}).then(response => response.data)
    }

    updateFiled(eventID){
        console.log(eventID + "!!!");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/archived", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    updatePending(eventID){
        console.log(eventID + "!!!");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/pending", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    updateCancel(eventID){
        console.log("Er i event service");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/cancel", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    getCategoryFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/category/" + eventID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }

    getContactinfoForEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/contactinfo/" + eventID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }

    getContactinfoForEventV2(eventID){
        return axios.get("http://" + ipAdress + ":8080/contactinfo/" + eventID).then(response => response.data[0]);
    }

    getTicketById(ticketID){
        return axios.get("http://" + ipAdress + ":8080/tickets/" + ticketID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }

    getTicketFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/tickets/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    updateEvent(eventID, name, date, description, place, categoryID, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let eventInfo = {name: name, date: date, description: description, place: place, categoryID: categoryID, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/edit", eventInfo, {headers: authenticationHeader()}).then(response => response.data)
    }

    updateContactInfo(name, phone, email, eventID){
        let contactInfo = {name: name, phone: phone, email: email};
        return axios.put("http://" + ipAdress + ":8080/event/contactinfo/" + eventID, contactInfo, {headers: authenticationHeader()}).then(response => response.data)
    }

    deleteTicketsForEvent(eventID){
        return axios.delete("http://" + ipAdress + ":8080/event/tickets/" + eventID, {headers: authenticationHeader()}).then(response => response.data)
    }

    addComment(eventID, userID, commentText){
        let comment = {eventID: eventID, userID: userID, commentText: commentText};
        return axios.post("http://" + ipAdress + ":8080/event/comments", comment, {headers: authenticationHeader()}).then(response => response.data)
    }

    getComments(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/comments/" + eventID, {headers: authenticationHeader()}).then(response => response.data)
    }
}

export let eventService = new EventService();
