let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
const UserDao = require("./dao/UserDao");
const dotenv = require('dotenv');
let secret =  require("./config.json");
dotenv.config();
let multer = require("multer");

let bcrypt = require("bcrypt");
let saltRounds = 10;

const jwt = require('jsonwebtoken');


app.use(bodyParser.json()); // for å tolke JSON
const AdminDao = require("../src/dao/adminDao");
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
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

const userDao = new UserDao(pool);
let adminDao = new AdminDao(pool);
let eventDao = new EventDao(pool);

//Here we need to have a app.use which will verify the token so that you can not use any of them without token!!

let privateKey = (publicKey = secret.secret);
/*
app.use("/api/", (req, res, next) => {
    let token = req.headers["authorization"];
    console.log(token);
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.username);
            next();
        }
    });
});

 */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../../client/src/img/uploads');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

let upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
    if(!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log("File received");
        console.log(req.file.path);
        return res.send({
            filePath: req.file.path,
            success: true
        })
    }
});


app.post("/api/posts", verifyToken, (req,res) => {
    console.log(req);
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created",
                authData
            });
        }
    });

});

app.get("/user/:userID", (req, res) => {
    console.log("/users/ fikk request fra klient");
    console.log()
    adminDao.getUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/user/:userID", (req, res) => {
    adminDao.getUser(req.params.userID,(status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/role/:roleID", (req, res) => {
    adminDao.getRoleById(req.params.roleID, (status, data) => {
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

app.post("/user", (req, res) => {
    userDao.registerUser(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/validate", (req,res) => {
    //Check password and email up against a databsae call
    //If okay create a token, and send that token back
    //else return a 401
    userDao.getApprovedUser(req.body.email, (status, data) => {
        if (data.length > 0) {
            console.log("User exists");
            //console.log(req.body.password);
            let passwordHash = JSON.stringify(data[0].password_hash).slice(1,-1);
            let role = JSON.stringify(data[0].role);
            let approved = JSON.stringify(data[0].approved);
            bcrypt.compare(req.body.password, passwordHash, function(err, response) {
                if (err) {
                    console.log("En error occured");
                    console.error(err);
                }
                if (response) {
                    let token = jwt.sign({email: req.body.email, role : role, approved : approved}, privateKey, {
                        expiresIn: 900
                    });
                    res.json({jwt: token});
                } else {
                    res.status(401);
                    res.json({error: "Not authorized"});
                    console.log("Did not work");
                }

            });
            
        } else {
            console.log("User does not exists");
        }

    })


});

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(' '); //Removes Bearer before token
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    } else {
        res.sendStatus(403);
    }
}


app.put("/users/:userID", (req, res) => {
    console.log("users/:userID fikk request fra klient");
    adminDao.approveUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


app.post("/users/:userID/role", (req, res) => {
    console.log("users/:userID/role fikk request fra klient");
    console.log(req.body);
    adminDao.assignRole(req.params.userID, req.body.roleID, (status, data) => {
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
    userDao.updateProfile(req.body, (status, data) => {
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
app.get("/event/all", (req, res) => {
    console.log("/event fikk request fra klient");
    eventDao.getAllEvents((status, data) => {
        res.status(status);
        res.json(data);
    });
});
app.get("/event/nonFiled", (req, res) => {
    console.log("/event fikk request fra klient");
    eventDao.getNonFiledEvents((status, data) => {
        res.status(status);
        res.json(data);
    });
});
app.get("/event/:eventID", (req, res) => {
    console.log("/event/ID fikk request fra klient");
    eventDao.getEventByID(req.params.eventID, (status, data) => {
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

app.get("/tickets", (req, res) => {
   eventDao.getTicket((status, data) => {
       res.status(status);
       res.json(data)
   })
});


app.get("/roles/:role", (req, res) => {
    adminDao.getRole(req.params.role, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/roles", (req, res) => {
    adminDao.getRoles((status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.post("/tickets", (req, res) => {
    eventDao.addTicket(req.body, (status, data) =>{
        res.status(status);
        res.json(data)
    })
});

app.post("/categories", (req, res) =>{
    eventDao.addCategory(req.body, (status, data) => {
        res.status(status);
        res.json(data)
    })
});

app.put("/users/:userID/approve",(req, res) => {
    adminDao.approveUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.put("/users/:userID/disapprove", (req, res) => {
    adminDao.disapproveUser(req.params.userID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.delete('/event/:id', (req, res) => {
    console.log('/event/:id: fikk request fra klient');
    eventDao.deleteEvent(parseInt(req.params.id), (status, data) => {
        res.status(status);
        res.json(data);
    });
});

let server = app.listen(8080);

