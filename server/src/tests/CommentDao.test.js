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
 * test for: addComment() in eventDao.js
 */
test("test: addComment()", done =>{

    function callback(status, data){
        console.log(
            "Test addComment eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    let comment = {eventID: 1, userID: 3, commentText: "testing testing 1 2 1 2 "};
    eventDao.addComment(comment, callback);
});

/**
 * test for: getComment() in eventDao.js
 */
test("test: getComments()", done =>{

    function callback(status, data){
        console.log(
            "Test getComments eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        expect(data[0].commentText).toBe("this is a test comment");
        done();
    }
    eventDao.getComments(1, callback);
});