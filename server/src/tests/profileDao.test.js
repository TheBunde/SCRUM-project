let mysql = require('mysql');

const ProfileDao = require('../dao/profileDao');
const runsqlfile = require('./runsqlfile');

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql.stud.iie.ntnu.no",
    user: "g_scrum_5",
    password: "TYQHbYDq",
    database: "g_scrum_5",
    debug: false,
    multipleStatements : true
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



