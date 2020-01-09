
let express = require("express"); 
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser"); 
app.use(bodyParser.json()); // for å tolke JSON
const AdminDao = require("../src/dao/adminDao");

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

let adminDao = new AdminDao(pool);

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




let server = app.listen(8080);
