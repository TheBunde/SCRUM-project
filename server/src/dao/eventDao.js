const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getEvent(callback){
        super.query("SELECT * FROM Event WHERE filed IS 0 ORDER BY date DESC", [], callback);
    }

    getEvent(eventID, callback){
        super.query("SELECT * FROM Event WHERE event_id=?", [eventID], callback);
    }

    addEvent(event, callback){
        super.query("INSERT INTO Event(name, description, date, place, img_url, artists, tech_rider, hospitality_rider, personnel) VALUES (?,?,?,?,?,?,?,?,?)", [event.name, event.description, event.date, event.place, event.img_url, event.artists, event.tech_rider, event.hospitality_rider, event.personnel], callback)
    }
};