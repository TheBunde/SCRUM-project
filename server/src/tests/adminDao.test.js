let mysql = require("mysql");
const AdminDao = require("../dao/adminDao.js");
let runsqlfile = require("./runsqlfile.js");

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

let adminDao = new AdminDao(pool);



/*
    tests getUser: henter User med Id 1
*/
test("get User from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(1);
        expect(data[0].name).toBe("test1");
        expect(data[0].approved).toBe(0);
        done();
    }

    adminDao.getUser(1, callback);
});

/*
    tests getUsers
*/

test("get User from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
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
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].user_id).toBe(1);
        expect(data[0].approved).toBe(1);
        expect(data[0].role_id).toBe(2);
        done();
    }

    function callback(status, data){
        adminDao.getUser(1, callback2);
    }

    let myjson = {roleID : 2};
    adminDao.assignRole(1, myjson, callback);
});


/*
    tests assignRole: assignes role 2 to user_id 1
*/

test("test assigning roles", done =>{

    function callback(status, data) {
        console.log(
            "Test getUser adminDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    adminDao.deleteUser(2, callback);
});