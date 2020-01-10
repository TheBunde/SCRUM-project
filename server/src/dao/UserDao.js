const dao = require('./dao.js');
let crypto = require('crypto');
let bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class UserDao extends dao {

    registerUser(json, callback) {
        let val = [json.name, json.email, json.phone];
        bcrypt.hash(json.password, saltRounds)
            .then((resp) => {
                val.push(resp);
                super.query(
                    "INSERT into User (name, email, phone, password_hash) values (?, ?, ?,  ?)",
                    val,
                    callback
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getHash(email, callback) {
        super.query("SELECT password_hash from User where email = ?", email, callback);
    }

    getOne(email, callback) {
        super.query("SELECT * from User where email = ? ", email, callback);
    }









};
