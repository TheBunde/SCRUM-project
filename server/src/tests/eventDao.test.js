let mysql = require("mysql");
const EventDao = require("../dao/eventDao.js");
let runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
// GitLab CI Pool
let pool: mysql.Pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let eventDao = new EventDao(pool);


test("get event from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].event_id).toBe(1);
        expect(data[0].name).toBe("the Donn party");
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
        done();
    }
    
    function callback(status, data){
        eventDao.getEvent(3,callback2);
    }
    
    let event = {name : "Just added", date:  "2020-01-20 20:45:00",description:  "the DB test made this", place : "Sukkerhuset", artists : "Javascript, mysql, ci, nodeJs ", tech_rider:  "nintendo switch", hospitality_rider: "potato chips", personnel: "Team 5", img_url: "eagle.png"};
    eventDao.addEvent(event, callback);
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





