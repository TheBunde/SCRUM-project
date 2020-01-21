let mysql = require("mysql");

const UserDao = require("../dao/UserDao.js");

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
            name: "Test testesen", email: "test@test.no", phone: "88888888", profile_photo: "test.jpg", password: "hei123"
        }, callback
    );
});

/*
test("get hash", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].password_hash).toBe('3856f5086eb7138f2e4e3d42d8569ce4f4b66a83cbce3192da65ee129e8c01d2832057b4bd8f124a2a47d376de0c1808cabc2e467275cc9f7b8a059d618c04bd');
        done();
    }
    userDao.getUser(
        "test4@tester.no", callback
    );
});

*/

test("get user", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(3);
        expect(data[0].name).toBe("test3");
        expect(data[0].role_id).toBe(2);
        expect(data[0].role).toBe('Sceneansvarlig');
        done();
    }
    userDao.getUser(
        "test3@tester.no", callback
    );
});

test("get the approved user", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(3);
        expect(data[0].name).toBe('test3');
        expect(data[0].role_id).toBe(2);
        expect(data[0].role).toBe('Sceneansvarlig');
        done();
    }
    userDao.getApprovedUser(
        "test3@tester.no", callback
    );
});

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
        userDao.getUser('new@mail.com', callback2);
    }

    userDao.updateProfile({ name: 'Grete', phone: '09876543', email : 'new@mail.com', user_id: 2 }, callback);
});

test("changing password", done => {
    function callback2(status, data) {
       console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));

       expect(data[0].password_hash).toBe("$2b$10$V06K1Z5HDCeIu423qwfef.JtO4VY1ll9r8FvgvXiIpoxE6ObstdUi");
       done();
    }
    function callback(status, data){
        userDao.getUser("test@test.no", callback2);
    }

    let json = {user_id: 4, password: "hei1234"};
    userDao.changePassword(json, callback);
});