
let express = require("express"); 
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser"); 
app.use(bodyParser.json()); // for å tolke JSON

let pool = mysql.createPool({ 
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no", 
    user: "",
    password: "", 
    database: "", 
    debug: false
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = app.listen(8080);
