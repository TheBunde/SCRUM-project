const dao = require('./dao.js');
let crypto = require('crypto');

module.exports = class UserDao extends dao {
    //Creating the salt
    genRandomString = (length) => {
        return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    };

    sha512 = (password, salt) => {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };

    saltHashPassword = (userPassword) => {
        let salt = this.genRandomString(16); /** Gives us salt of length 16 */
        let passwordData = this.sha512(userPassword, salt);
        return passwordData;
    };

    registerUser(json, callback) {
        let pass = this.saltHashPassword(json.password);
        console.log(pass);
        let val = [json.name, json.email, json.phone, pass.salt, pass.passwordHash, json.role_id];
        super.query(
            "INSERT into User (name, email, phone, salt, password_hash, role_id) values (?, ?, ?,  ?, ?, ?)",
            val,
            callback
        );
    }


};