const dao = require('./dao.js');
let crypto = require('crypto');

module.exports = class UserDao extends dao {
    //Creating the salt

    genRandomString(length) {
        return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    };


    sha512(password, salt) {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };


    saltHashPassword(userPassword) {
        let salt = this.genRandomString(16); /** Gives us salt of length 16 */
        let passwordData = this.sha512(userPassword, salt);
        return passwordData;
    };

    //Needs to find a way to catch the sql error if they occur
    registerUser(json, callback) {
        let pass = this.saltHashPassword(json.password);
        let val = [json.name, json.email, json.phone, pass.salt, pass.passwordHash];
        super.query(
            "INSERT into User (name, email, phone, salt, password_hash) values (?, ?, ?,  ?, ?)",
            val,
            callback
        );
    }

    getSalt(email, callback) {

        super.query(
            "SELECT salt FROM User WHERE email LIKE ?",
            email,
            callback
        );

    }


    getHash(email, callback) {

        super.query(
            "SELECT password_hash FROM User WHERE email LIKE ?",
            email,
            callback
        );
        //console.log(callback);
    }


    hashPassword = (userPassword, salt) => {
        let passwordData = this.sha512(userPassword, salt);
        return passwordData;
    };



};