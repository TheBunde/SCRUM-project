let mysql = require("mysql");
const EventDao = require("../dao/eventDao.js");
let runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let eventDao = new EventDao(pool);


test("test: getEventById()", done =>{
    function callback(status, data) {
        console.log(
            "Test getEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].event_id).toBe(1);
        expect(data[0].name).toBe("the Donn party");
        done();
    }

    eventDao.getEventByID(1, callback);
});

test("test: getAllEvents()", done =>{
    function callback(status, data) {
        console.log(
            "Test getAllEvents eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(3);
        expect(data[0].event_id).toBe(2);
        done();
    }

    eventDao.getAllEvents(callback);
});

test("test: getAllArchived()", done =>{
    function callback2(status, data) {
        console.log(
            "Test getAllArchived eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(1);
        expect(data.length).toBeGreaterThanOrEqual(1);
        done();
    }

    function callback(){
        eventDao.getAllArchived(callback2);
    }

    eventDao.updateFiled(3,callback);

});

test("test: updateFiled", done =>{
    function callback2(status, data) {
        console.log(
            "Test updateFiled eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(1);
        done();
    }

    function callback(){
        eventDao.getEventByID(2, callback2)
    }

    eventDao.updateFiled(2,callback);
});

test("test: addEvent()", done =>{
    function callback2(status, data) {
        console.log(
            "Test addEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(0);
        expect(data[0].name).toBe("Just added");
        done();
    }
    
    function callback(status, data){
        eventDao.getEventByID(data.insertId,callback2);
    }
    let event = {name : "Just added", date:  "2020-01-20 20:45:00",description:  "the DB test made this", place : "Sukkerhuset", categoryID: 1, artists : "Javascript, mysql, ci, nodeJs ", tech_rider:  "nintendo switch", hospitality_rider: "potato chips", personnel: "Team 5", img_url: "eagle.png", contract: "everyone agrees"};
    eventDao.addEvent(event, callback);
});

test("test: deleteEvent()", done =>{

    function callback3(status, data) {
        console.log(
        "Test delete eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    function callback(status, data){
        eventDao.deleteEvent(5,callback3);
    }

    function dummy(status, data){

    }

    let event = {name : "to be deleted", date:  "2020-01-20 20:45:00",description:  "the DB test made this to be deleted", place : "Sukkerhuset", artists : "Javascript, mysql, ci, nodeJs ", tech_rider:  "nintendo switch", hospitality_rider: "potato chips", personnel: "Team 5", img_url: "eagle.png", categoryID: 1};
    eventDao.addEvent(event, dummy);
    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 5};
    eventDao.addContactInfo(contactInfo, dummy);
    let ticket = {eventID: 5, ticketID: 3, amount: 20};
    eventDao.addTicket(ticket, dummy);
    eventDao.getAllEvents(callback)
});

test("test: getNonFiledEvents()", done =>{

    function callback(status, data){
        console.log(
            "Test getNonFiledEvents eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        expect(data[0].name).toBe("the Donn party");
        expect(data[1].filed).toBe(0);
        done();
    }

    eventDao.getNonFiledEvents(callback);
});

test("test: getCategories()", done =>{

    function callback(status, data){
        console.log(
            "Test getCategories eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(3);
        expect(data[0].name).toBe("forelesning");
        done();
    }
    
    eventDao.getCategories(callback);
});
/*
test("test: addCategory()", done =>{

    function callback(status, data){
        console.log(
            "Test addCategory(Event_Category) eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let category = {eventID : 1, categoryID: 2};
    eventDao.addCategories(category, callback);
});
*/

test("test: getCategoryFromEvent()", done =>{
    function callback(status, data) {
        console.log(
            "Test getCategoryFromEvent for event 1 eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].category_id).toBe(2);
        done();
    }

    eventDao.getCategoryFromEvent(2, callback);

});

test("test: getTicket()", done =>{

    function callback(status, data){
        console.log(
            "Test getTicket eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(5);
        expect(data[0].name).toBe("Standard");
        done();
    }

    eventDao.getTicket(callback);
});

test("test: addTicket()", done =>{

    function callback(status, data){
        console.log(
            "Test addTicket eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let event_ticket = {eventID: 1, ticketID: 3, amount: 20};
    eventDao.addTicket(event_ticket, callback);
});

test("test: addContactInfo()", done =>{
    function callback(status, data){
        console.log(
            "Test addTicket eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 1};
    eventDao.addContactInfo(contactInfo, callback);
});

