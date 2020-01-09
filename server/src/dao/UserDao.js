const dao = require('./dao.js');
let crypto = require('crypto');
let bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class UserDao extends dao {
    /*
    //Creating the salt

    genRandomString(length) {
        return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format
            //.slice(0,length);   /** return required number of characters
    };


    sha512(password, salt) {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };


    saltHashPassword(userPassword) {
        let salt = this.genRandomString(16); /** Gives us salt of length 16
        let passwordData = this.sha512(userPassword, salt);
        return passwordData;
    };
    */
    registerUser(json, callback) {

        let val = [json.name, json.email, json.phone];

        bcrypt.hash(json.password, saltRounds)
            .then((resp) => {
                console.log(resp);
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

        //let pass = this.hashPassword(json.password);
        console.log(val);


        //console.log(pass);
        /*
        bcrypt.hash(json.password, saltRounds, function (err, hash) {
            if (err) {
                console.error(err);
            } else {
                val.push(hash);
            }
        });
        */


        console.log(val);
        /*
        super.query(
            "INSERT into User (name, email, phone, password_hash) values (?, ?, ?,  ?)",
            val,
            callback
        );

         */
    }

    getSalt(email, callback)
    {
        super.query(
            "SELECT salt FROM User WHERE email LIKE ?",
            [email],
            callback
        );

    }

    getHashAndSalt(email, callback)
    {
        super.query(
            "SELECT password_hash, salt from User where email = ?",
            [email],
            callback
        );
    }


    getHash(email, callback)
    {

        super.query(
            "SELECT password_hash FROM User WHERE email LIKE ?",
            email,
            callback
        );
        //console.log(callback);
    }

    hashPassword(userPassword, salt){
        let passwordData = this.sha512(userPassword, salt);
        return passwordData;
    };
};