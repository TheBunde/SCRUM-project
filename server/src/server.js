let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
const UserDao = require("./dao/UserDao");


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

app.post("/users", (req, res) => {
    userDao.registerUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

let server = app.listen(8080);
