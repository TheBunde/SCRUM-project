const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getEvents(callback){
        super.query(" SELECT * FROM Event WHERE filed = 0 ORDER BY date DESC limit 25", [], callback);
    }

    getEventByID(eventID, callback){
        super.query("SELECT * FROM Event WHERE event_id=?", [eventID], callback);
    }

    addEvent(event, callback){
        super.query("INSERT INTO Event(name, description, date, place, img_url, artists, tech_rider, hospitality_rider, personnel) VALUES (?,?,?,?,?,?,?,?,?)", [event.name, event.description, event.date, event.place, event.img_url, event.artists, event.tech_rider, event.hospitality_rider, event.personnel], callback)
    }

    getCategories(callback){
        super.query("SELECT * FROM Category", [], callback);
    }

    getTicket(callback){
        super.query("SELECT * FROM Ticket_Category", [], callback)
    }

    addTicket(ticket, callback){
        super.query("INSERT INTO Event_Ticket(event_id, ticket_category_id, number) VALUES (?, ?, ?)", [ticket.event_id, ticket.ticketID, ticket.number], callback)
    }
};