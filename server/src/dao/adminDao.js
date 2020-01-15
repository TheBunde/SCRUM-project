const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getUser(userID, callback){
        super.query("SELECT * FROM User WHERE user_id=?", [userID], callback);
    }

    getUsers(callback){
        super.query("SELECT user_id, name, email, phone, role_id, approved FROM User ORDER BY user_id", [], callback);
    }

    assignRole(userID, roleId, callback){
        super.query("UPDATE User SET role_id=? WHERE user_id=?", [parseInt(roleId), parseInt(userID)], callback);
    }

    approveUser(userID, callback){
        super.query("UPDATE User SET approved=1 WHERE user_id=?", [userID], callback);
    }

    deleteUser(userID, callback){
        super.query("DELETE FROM User WHERE user_id=?", [userID], callback);
    }

    disapproveUser(userID, callback){
        super.query("UPDATE User SET approved=0 WHERE user_id=?", [userID], callback);
    }

    getRole(role, callback){
        super.query("SELECT role_id FROM Role WHERE role=?", [role], callback);
    }

    getRoleById(roleID, callback){
        super.query("SELECT role FROM Role WHERE role_id=?", [roleID], callback);
    }

    getRoles(callback){
        super.query("SELECT role FROM Role", [], callback);
    }

};