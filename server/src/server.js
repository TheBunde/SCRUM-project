
let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
const UserDao = require("./dao/UserDao");
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.json()); // for å tolke JSON
const AdminDao = require("../src/dao/adminDao");
const ProfileDao = require("../src/dao/profileDao");
const EventDao = require("../src/dao/eventDao");

let pool = mysql.createPool({
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no",
    user: "g_scrum_5",
    password: "TYQHbYDq",
    database: "g_scrum_5",
    debug: false
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const userDao = new UserDao(pool);
let adminDao = new AdminDao(pool);
let profileDao = new ProfileDao(pool);
let eventDao = new EventDao(pool);

app.post("/user", (req, res) => {
    userDao.registerUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/user/:userID", (req, res) => {
    adminDao.getUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


app.get("/users/", (req, res) => {
    console.log("/users/ fikk request fra klient");
    adminDao.getUsers((status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/validate/:email", (req, res) => {
    console.log("/login request");
    userDao.getHashAndSalt(req.params.email, (status, data) => {
        res.status(status);
        res.json(data);
    })
    /*
    let salt = "123";

    let dbHash = userDao.getHash(req.body.email, (status, data) => {
        res.status(status);
        res.json(data);
    });

    let hash = userDao.hashPassword(req.body.password, salt);


    console.log("Hash : "+hash.passwordHash);
    console.log(userSalt);


    if (dbHash === hash) {
        console.log("Password is OK");
        //res.json({ "passwordOK": true });
        //res.status(200);
    } else {
        console.log("Password not ok");
        //res.json({ "passwordOK": false });
    }

     */
});


app.put("/users/:userID", (req, res) => {
    console.log("users/:userID fikk request fra klient");
    adminDao.approveUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.post("/users/:userID/role/", (req, res) => {
    console.log("users/:userID/role fikk request fra klient");
    adminDao.assignRole(req.params.userID, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.delete("/users/:userID/", (req, res) => {
    adminDao.deleteUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.put("/profile/:userId/edit", (req, res) => {
    console.log('/profile/:userId/edit: fikk request fra klient');
    profileDao.updateProfile(req.body, (status, data) => {
        console.log(data);
        res.status(status);
        res.json(data);
    });
});


app.post("/event", (req, res) => {
    eventDao.addEvent(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/categories", (req, res) => {
    eventDao.getCategories((status, data) => {
        res.status(status);
        res.json(data)
    })
});

let server = app.listen(8080);

