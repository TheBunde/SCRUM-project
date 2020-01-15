let mysql = require("mysql");

const UserDao = require("../dao/UserDao.js");
const runsqlfile = require("./runsqlfile");

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let userDao = new UserDao(pool);

test("that we can register a user", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }
    userDao.registerUser(
        {
            name: "Test testesen", email: "test@test.no", phone: "88888888", password: "hei123"
        }, callback
    );
});

test("get the approved user", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.affectedRows).toBe(1);
        done();
    }
    userDao.getApprovedUser(
        "test1@tester.no", callback
    );
});


