let mysql = require("mysql");
const EventDao = require("../dao/eventDao.js");
let runsqlfile = require("./runsqlfile.js");
import {Event} from "..../client/src/service/EventService.js";

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql.stud.iie.ntnu.no",
    user: "g_scrum_5",
    password: "TYQHbYDq",
    database: "g_scrum_5",
    debug: false,
    multipleStatements: true
});

let eventDao = new EventDao(pool);


beforeAll(done => {
    runsqlfile("../CreateDB.sql", pool, done);
});

afterAll(() => {
    pool.end();
});

test("get event from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].event_id).toBe(1);
        expect(data[0].name).toBe("the Donn party");
        expect(data[0].date).toBe("2020-02-03 20:30:00");
        done();
    }

    eventDao.getEvent(1, callback);
});

test("get events from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(2);
        expect(data[0].event_id).toBe(1);
        done();
    }

    eventDao.getEvents(callback);
});


test("add event to DB", done =>{
    function callback2(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(0);
        expect(data[0].name).toBe("Just added");
        expect(data[0].date).toBe("2020-01-20 20:45:00");
        done();
    }
    
    function callback(status, data){
        eventDao.getEvent(3,callback2);
    }
    
    let event = new Event("Just added",  "2020-01-20 20:45:00", "the DB test made this", "Sukkerhuset", "Javascript, mysql, ci, nodeJs ", "nintendo switch", "potato chips", "Team 5", "eagle.png"); 
    eventDao.addEvent(1, callback);
});



test("get categories DB", done =>{

    function callback(status, data){
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(3);
        expect(data[0].name).toBe("forelesning");
        done();
    }
    
    eventDao.getCategories(callback);
});





