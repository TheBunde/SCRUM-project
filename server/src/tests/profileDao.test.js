let mysql = require('mysql');

const UserDao = require("../dao/UserDao.js");
const runsqlfile = require('./runsqlfile');

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



test('Changing contact information', done => {
    function callback(status, data) {
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    userDao.updateProfile({ name: 'Grete', tlf: '09876543', email : 'new@mail.com', user_id: 3 }, callback);
});



