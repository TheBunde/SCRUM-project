const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getUsers(callback){
        super.query("SELECT user_id, name, email, phone, role_id, approved FROM User ORDER BY user_id", [], callback);
    }
};