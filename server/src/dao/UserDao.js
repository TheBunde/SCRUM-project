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
        super.query("SELECT password_hash from User where email = ?", [email], callback);
    }

    getUser(email, callback) {
        super.query("SELECT * from User join Role on User.role_id = Role.role_id where email = ? ", email, callback);
    }

    getApprovedUser(email, callback) {
        console.log(email);
        super.query("SELECT * from User JOIN Role on User.role_id = Role.role_id where email = ? AND approved = 1", email, callback)
    }


    changePassword(json, callback) {
        let val = [json.user_id];
        bcrypt.hash(json.password, saltRounds).then(res => {
            val.unshift(res); // Hashing and then inserting at the beginning of val for use in the query.
            console.log(val);
            super.query(
                "UPDATE User SET password_hash = ? WHERE user_id = ?",
                val,
                callback
            )
        }).catch((err) => {
            console.log("Error error nono nicht gut");
        });
    }

    updateProfile({ user_id, name, phone, email }, callback) {
        var val = [name, phone, email, user_id];
        super.query(
            'UPDATE User SET name = ?, phone = ?, email = ? where user_id = ?',
            val,
            callback
        );
    }
};
