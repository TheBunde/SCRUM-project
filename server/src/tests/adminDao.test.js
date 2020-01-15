let mysql = require("mysql");
const AdminDao = require("../dao/adminDao.js");
let runsqlfile = require("./runsqlfile.js");

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

let adminDao = new AdminDao(pool);

/*
    tests getUser: henter User med Id 2
*/
test("get User with id 1", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(1);
        expect(data[0].name).toBe("test1");
        done();
    }

    adminDao.getUser(1, callback);
});

/*
    tests getUsers
*/
test("get Users from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUsers adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(3);
        expect(data[0].user_id).toBe(1);
        expect(data[1].user_id).toBe(2);
        expect(data[0].name).toBe("test1");
        expect(data[1].approved).toBe(0);
        done();
    }

    adminDao.getUsers(callback);
});

/*
    tests assignRole: assignes role 2 to user_id 1
*/

test("test assigning roles", done =>{

    function callback2(status, data) {
        console.log(
            "Test assignRole adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].user_id).toBe(1);
        expect(data[0].role_id).toBe(2);
        done();
    }

    function callback(status, data){
        adminDao.getUser(1, callback2);
    }

    adminDao.assignRole(1, 2, callback);
});

test("test approve roles", done =>{

    function callback2(status, data) {
        console.log(
            "Test approveUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].user_id).toBe(1);
        expect(data[0].approved).toBe(1);

        done();
    }

    function callback(status, data){
        adminDao.getUser(2, callback2);
    }

    adminDao.approveUser(2, callback);
});


/*
    delete user
*/
test("delete user", done =>{

    function callback(status, data) {
        console.log(
            "Test deleteUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    adminDao.deleteUser(3, callback);
});

/*
disapproveUser
 */
test("disapprove user", done =>{

    function callback(status, data) {
        console.log(
            "Test disapprove callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        expect(data[0].approved).toBe(0);
        done();
    }

    adminDao.disapproveUser(1, callback);
});

/*
getRole
 */
test("get Role", done =>{

    function callback(status, data) {
        console.log(
            "Test getRole callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        done();
    }

    adminDao.getRole(3, callback);
});

/*
getRole by ID
 */
test("getRole by ID", done =>{

    function callback(status, data) {
        console.log(
            "Test getRole by ID callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].role).toBe('Økonomisjef');
        done();
    }

    adminDao.getRoleById(3, callback);
});

/*
getRoles
 */
test("get Roles", done =>{

    function callback(status, data) {
        console.log(
            "Test getRoles callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(18);
        done();
    }

    adminDao.getRoles( callback);
});

