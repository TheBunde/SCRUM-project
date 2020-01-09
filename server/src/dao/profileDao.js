

const Dao = require("./dao.js");

module.exports = class profileDao extends Dao{


    updateProfile({ user_id, name, tlf, email }, callback) {
        var val = [name, tlf, email, user_id];
        super.query(
            'UPDATE User SET name = ?, phone = ?, email = ? where user_id = ?',
            val,
            callback
        );
    }
};