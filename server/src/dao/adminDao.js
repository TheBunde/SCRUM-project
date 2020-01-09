const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getUser(userID, callback){
        super.query("SELECT * FROM User WHERE user_id=?", [userID], callback);
    }

    getUsers(callback){
        super.query("SELECT user_id, name, email, phone, role_id, approved FROM User ORDER BY user_id", [], callback);
    }

    approveUser(userID, callback){
        super.query("UPDATE User SET approved=1 WHERE user_id=?", [userID], callback);
    }

    assignRole(userID, json, callback){
        var val = json.roleID;
        super.query("UPDATE User SET role_id=? WHERE user_id=?", [val, userID], callback);
    }

    deleteUser(userID, callback){
        super.query("DELETE FROM User WHERE user_id=?", [userID], callback);
    }


};