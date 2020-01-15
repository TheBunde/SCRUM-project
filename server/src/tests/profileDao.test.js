let mysql = require('mysql');

const UserDao = require("../dao/UserDao.js");
const runsqlfile = require('./runsqlfile');
const AdminDao = require("../dao/adminDao.js");

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

let userDao = new UserDao(pool);
let adminDao = new AdminDao(pool);



test('Changing contact information', done => {
    function callback2(status, data) {
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].user_id).toBe(2);
        expect(data[0].name).toBe('Grete');
        expect(data[0].phone).toBe('09876543');
        expect(data[0].email).toBe('new@mail.com');
        done();
    }

    function callback(status, data){
        adminDao.getUser(2, callback2);
    }

    userDao.updateProfile({ name: 'Grete', phone: '09876543', email : 'new@mail.com', user_id: 3 }, callback);
});



