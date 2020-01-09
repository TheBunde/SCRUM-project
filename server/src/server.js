let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
const UserDao = require("./dao/UserDao");
const dotenv = require('dotenv');
dotenv.config();

let bcrypt = require("bcrypt");
let saltRounds = 10;


const jwt = require('jsonwebtoken');


app.use(bodyParser.json()); // for å tolke JSON

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


app.post("/user", (req, res) => {
    userDao.registerUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});



app.get("/validate/:email", (req, res) => {
    console.log("/login request");
    userDao.getHashAndSalt(req.params.email, (status, data) => {
        res.status(status);
        res.json(data);
    });
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




let server = app.listen(8080);
