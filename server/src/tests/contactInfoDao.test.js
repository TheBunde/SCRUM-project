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

/**
 * test for: addContactInfo() in eventDao.js
 */
test("test: addContactInfo()", done =>{
    function callback(status, data){
        console.log(
            "Test addContactInfo eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 1};
    eventDao.addContactInfo(contactInfo, callback);
});

/**
 * test for: updateContactInfo() in eventDao.js
 */
test("test: getContactInfoForEvent()", done =>{
    function callback(status, data){
        console.log(
            "Test getContactInfoForEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].name).toBe("Metallica");
        expect(data[0].phone).toBe("2386724692");
        done();
    }
    eventDao.getContactinfoForEvent(2, callback);
});

/**
 * test for: updateContactInfo() in eventDao.js
 */
test("test: updateContactInfo()", done =>{
    function callback2(status, data){
        console.log(
            "Test updateContactInfo eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].name).toBe("hei sveis");
        expect(data[0].phone).toBe("00000001");
        done();
    }

    function callback(status, data){
        eventDao.getContactinfoForEvent(1, callback2);
    }

    let contactInfo = {name: "hei sveis", phone: "00000001", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw"};
    eventDao.updateContactInfo(1, contactInfo, callback);
});
