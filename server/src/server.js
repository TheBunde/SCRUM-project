let express = require("express");
let mysql = require("mysql");
let app = express();
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({extended: false});
const UserDao = require("./dao/UserDao");
const dotenv = require('dotenv');
let secret = require("./config.json");
dotenv.config();
let multer = require("multer");
let uuid = require("uuid");
const debug = require('debug')('myapp:server');
let path = require("path");
const serveIndex = require("serve-index");
let bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

let saltRounds = 10;

let Mail = require("./sendMail");



app.use(bodyParser.json()); // for å tolke JSON
const AdminDao = require("../src/dao/adminDao");
const EventDao = require("../src/dao/eventDao");


let pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    debug: false
});





app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

const userDao = new UserDao(pool);
let adminDao = new AdminDao(pool);
let eventDao = new EventDao(pool);

let mail = new Mail();

//Here we need to have a app.use which will verify the token so that you can not use any of them without token!!

let privateKey = (publicKey = secret.secret);
/*
app.use("", (req, res, next) => {
    console.log("SJEKKER OM TOKEN ER GOOD!!!");
    let token = req.token;
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


function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/*app.all("*", function(req, res, next) {
    //get auth header value
    console.log("Step 1")
    if(req.path !== "/validate" && req.path !== "/user"){
        console.log("Step 2")
        const bearerHeader = req.headers["authorization"];
        console.log(bearerHeader);

        if (typeof bearerHeader !== "undefined") {
            console.log("Step 3")
            //split at the space
            const bearer = bearerHeader.split(' '); //Removes Bearer before token
            const token = bearer[1];
            console.log(token)

            jwt.verify(token, publicKey, (err, decoded) => {
                if (err) {
                    console.log("Token IKKE ok");
                    res.json({ error: "Not authorized" });
                } else {
                    console.log("Token ok: " + decoded.username);
                    next();
                }
            });
        } else {
            console.log("heyhey :(");
        }
    }
    next();
});*/

function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(__dirname + '/../../..');
        cb(null, path.join(__dirname, "../../public/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + uuid.v4() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname;
app.use('/ftp', express.static('../../public/uploads'), serveIndex('public', {'icons': true}));


app.post('/upload', upload.single('file'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log("File received");
        console.log(req.file.mimetype);
        console.log(req.file.mimetype.split("/")[0]);
        if (req.file.mimetype.split("/")[0] !== "image") { //Not an image
            return res.send({
                success: false,
                error: "Only images are allowed"
            })
        } else {
            return res.send({
                filePath: req.file,
                success: true
            });
        }

    }
});


app.post("/uploadFiles", upload.array("files", 5), (req, res) => {
    if (!req.files) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log(req.files);
        console.log("File received");
        //Check for application type, must be either a plain text, word-doc or pdf
        //If at least one of the elements are not plain text and not word-doc and not pdf the files will not be uploaded

        if (!req.files.some(element => element.mimetype.split("/")[0] !== "image" && element.mimetype !== "text/plain" && element.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && element.mimetype !== "application/pdf")) {
            return res.send({
                filePath: req.files,
                success: true
            })
        } else {
            return res.send({
                success: false,
                error: "You have uploaded some files which are not allowed"
            })
        }





    }
});

app.get('/image/:imagePath', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/uploads/' + req.params.imagePath));
});


app.post("/posts", verifyToken, (req, res) => {
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

app.get("/user/:userID", verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {

            console.log("/users/ fikk request fra klient");
            console.log()
            adminDao.getUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});
/*
I'm not sure if this is the best restful soliution, but hey ho
 */
app.post("/user/reset_password", (req, res) => {
    userDao.getUser(req.body.email, (status, data) => {
        if (data.length > 0) {
            let newPass = makeid(8);
            console.log(newPass);
            //res.json(data[0].user_id);
            userDao.changePassword({user_id : data[0].user_id, password: newPass}, (statusCode, result) => {
                res.status(statusCode);
                res.json(result);
                mail.sendResetPasswordMail(data[0], newPass);
            });

        } else {
            res.json({error: "User does not exist"})
        }
    })
});

app.put("/user/:userID/edit/password",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            // Check if user with pw entered exists, if so -> change their pw.
            console.log("server: " + req.body.email);
            userDao.getApprovedUser(req.body.email, (status, data) => {
                if (data.length > 0) {
                    console.log("User exists");

                    let passwordHash = JSON.stringify(data[0].password_hash).slice(1,-1);
                    bcrypt.compare(req.body.password, passwordHash, function(err, response) {
                        if (err) {
                            console.log("An error occured");
                            console.error(err);
                        } if (response) { // If response is true <=> If the passwords are equal
                            userDao.changePassword({user_id: parseInt(req.params.userID), password: req.body.newPassword}, (statusCode, result) => {
                                res.status(statusCode);
                                res.json(result);
                                console.log("Password changed");
                            });
                        } else { // Passwords are not equal -> The user should not have access to change this password
                            res.json({error: "Not authorized"});
                            res.status(401);
                            console.log("Did not work");
                        }
                    });
                }
            });
        }
    });

});

app.get("/user/:userID", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/role/:roleID",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRoleById(req.params.roleID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


app.get("/users/", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("/users/ fikk request fra klient");
            adminDao.getUsers((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.post("/user", (req, res) => {
    console.log("post /user");
    console.log(req.body);

    userDao.registerUser(req.body, (status, data) => {
        console.log("http status code: "+status);
        if(status === 200){
            mail.sendMail(req.body);
        }
        res.status(status);
        res.json(data);
    });


});

app.post("/validate", (req, res) => {
    //Check password and email up against a databsae call
    //If okay create a token, and send that token back
    //else return a 401
    userDao.getApprovedUser(req.body.email, (status, data) => {
        if (data.length > 0) {
            console.log("User exists");
            //console.log(req.body.password);
            let passwordHash = JSON.stringify(data[0].password_hash).slice(1, -1);
            let role = JSON.stringify(data[0].role);
            let approved = JSON.stringify(data[0].approved);
            let id = JSON.stringify(data[0].user_id);
            bcrypt.compare(req.body.password, passwordHash, function (err, response) {
                if (err) {
                    console.log("En error occured");
                    console.error(err);
                }
                if (response) {
                    let token = jwt.sign({
                        email: req.body.email,
                        role: role,
                        approved: approved,
                        user_id: id
                    }, privateKey, {
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
            res.status(401);
            res.json({error: "User noes not exists"})
        }

    })


});

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(' '); //Removes Bearer before token
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    } else {
        res.sendStatus(403);
    }
}


app.put("/users/:userID", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("users/:userID fikk request fra klient");
            adminDao.approveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


app.post("/users/:userID/role",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("users/:userID/role fikk request fra klient");
            console.log(req.body);
            adminDao.assignRole(req.params.userID, req.body.roleID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.delete("/users/:userID/", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.deleteUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});


app.put("/profile/:userId/edit",verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log('/profile/:userId/edit: fikk request fra klient');
            userDao.updateProfile(req.body, (status, data) => {
                console.log(data);
                res.status(status);
                res.json(data);
            });
        }
    });

});


app.post("/event", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addEvent(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/event/all", (req, res) => {
    console.log("/event fikk request fra klient");
    eventDao.getAllEvents((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/event/archived",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("/event fikk request fra klient");
            eventDao.getAllArchived((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.get("/event/active", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("/event fikk request fra klient");
            eventDao.getAllActive((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


app.put('/event/:eventID/archived', verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log('/annonse/:eventID/archived: fikk request fra klient');
            console.log(req.params.eventID);
            eventDao.updateFiled(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.put('/event/:eventID/cancel',verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log('/annonse/:eventID/archived: fikk request fra klient');
            console.log("er i event DataBASE SERVER");
            eventDao.updateCancel(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.put('/event/:eventID/pending', verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log('/annonse/:eventID/pending: fikk request fra klient');
            console.log(req.params.eventID);
            eventDao.updatePending(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.get("/event/nonFiled",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            console.log("/event fikk request fra klient");
            eventDao.getNonFiledEvents((status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});
app.get("/event/:eventID",(req, res) => {
            console.log("/event/ID fikk request fra klient");
            eventDao.getEventByID(req.params.eventID, (status, data) => {
                res.status(status);
                res.json(data);
            })
});

app.get("/categories", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getCategories((status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });

});

app.get("/tickets", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicket((status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });

});


app.get("/roles/:role", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRole(req.params.role, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/roles", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.getRoles((status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.post("/tickets",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addTicket(req.body, (status, data) => {
                res.status(status);
                res.json(data)
            })
        }
    });

});

app.put("/users/:userID/approve",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.approveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.put("/users/:userID/disapprove",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            adminDao.disapproveUser(req.params.userID, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.delete('/event/:id',verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteEvent(parseInt(req.params.id), (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });
    console.log('/event/:id: fikk request fra klient');

});

app.put("/event/:id/edit",verifyToken, (req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateEvent(req.params.id, req.body, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});


app.get("/category/:id", verifyToken,(req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getCategoryFromEvent(req.params.id, (status, data) => {
                res.status(status);
                res.json(data);
            });
        }
    });

});

app.post("/contactinfo", verifyToken,(req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addContactInfo(req.body, (status, data) => {
                res.status(status);
                res.json(data);
            })
        }
    });
});

app.get("/contactinfo/:id",verifyToken, (req, res) => {
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getContactinfoForEvent(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/tickets/:id", verifyToken,(req, res)=>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicketById(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/event/tickets/:id",verifyToken, (req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicketFromEvent(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/event/tickets/:id",verifyToken, (req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getTicketFromEvent(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.put("/event/contactinfo/:id",verifyToken, (req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.updateContactInfo(req.params.id, req.body, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.delete("/event/tickets/:id", verifyToken,(req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.deleteTicketsForEvent(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.post("/event/comments",verifyToken, (req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.addComment(req.body, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

app.get("/event/comments/:id", verifyToken,(req, res) =>{
    jwt.verify(req.token, privateKey, (err, authData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            eventDao.getComments(req.params.id, (status, data) =>{
                res.status(status);
                res.json(data);
            })
        }
    });

});

let server = app.listen(8080);