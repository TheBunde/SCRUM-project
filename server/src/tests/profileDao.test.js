let mysql = require('mysql');

const ProfileDao = require('../dao/profileDao');
const runsqlfile = require('./runsqlfile');

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

let profileDao = new ProfileDao(pool);



test('Changing contact information', done => {
    function callback(status, data) {
        console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    profileDao.updateProfile({ name: 'Grete', tlf: '09876543', email : 'new@mail.com', user_id: 3 }, callback);
});



