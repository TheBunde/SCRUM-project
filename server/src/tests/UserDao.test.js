let mysql = require("mysql");

const UserDao = require("../dao/UserDao.js");
const runsqlfile = require("./runsqlfile");

let pool = mysql.createPool({
    connectionLimit : 1,
    host: "mysql",
    user: "root",
    password: "root123",
    database: "school",
    debug: false,
    multipleStatements: true
});


let userDao = new UserDao(pool);

beforeAll(done => {
    runsqlfile("create_tables.sql", pool, () => {
        runsqlfile("create_testdata.sql", pool, done);
    });
});

test("that we can register a user", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }
    userDao.registerUser(
        {
            name: "Test testesen", email: "test@test.no", phone: "12345678", password: "hei123"
        }, callback
    );
});

test("that we can not register a user that has already been registered", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data = " + JSON.stringify(data));
        //expect(status.to)
    }
    userDao.registerUser(
        {
            name: "Test testesen", email: "test@test.no", phone: "12345678", password: "hei123"
        },callback
    );
});


afterAll() => {
    pool.end();
}