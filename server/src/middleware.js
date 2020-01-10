import UserDao from './dao/UserDao';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

//Ned to find a better way to set up the pool, but for now:

let pool = mysql.createPool({
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no",
    user: "g_scrum_5",
    password: "TYQHbYDq",
    database: "g_scrum_5",
    debug: false
});


let userDao = new UserDao(pool);

export let validatePassword = (json, callback) => {
    userDao.getHash(json.email, (status, data) => {
        if (data.length > 0) { //The email exists
            console.log(data);
            //bcrypt.compare(json.password, data.password_hash)
        }
    })


};