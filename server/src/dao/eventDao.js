const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getEvent(callback){
        super.query("SELECT * FROM Event WHERE filed IS 0 ORDER BY date DESC", [], callback);
    }

    getEvent(eventID, callback){
        super.query("SELECT * FROM Event WHERE event_id=?", [eventID], callback);
    }

    postEvent(json, callback){
        super.query("INSERT INTO Event(name, description, date, place, img_url, artists, tech_rider, hospitality_rider, personnel) VALUES (?,?,?,?,?,?,?,?,?)", [json.name, json.description, json.date, json.place, json.img_url, json.artists, json.tech_rider, json.hospitality_rider, json.personnel], callback)
    }
};