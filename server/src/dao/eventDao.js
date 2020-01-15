const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getAllEvents(callback){
        super.query(" SELECT * FROM Event ORDER BY date DESC", [], callback);
    }

    getAllArchived(callback){
        super.query(" SELECT * FROM Event WHERE filed = 1 ORDER BY date DESC", [], callback);
    }

    getNonFiledEvents(callback){
        super.query(" SELECT * FROM Event WHERE filed = 0 ORDER BY date DESC", [], callback);
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
        super.query("INSERT INTO Event_Ticket(event_id, ticket_category_id, price, number) VALUES (?, ?, 0, ?)", [ticket.eventID, ticket.ticketID, ticket.amount], callback)
    }

    addCategory(category, callback){
        super.query("INSERT INTO Event_Category(event_id, category_id) VALUES (?, ?)", [category.eventID, category.categoryID], callback)
    }

    deleteEvent(eventID, callback){
        super.query("DELETE FROM Contact_Info WHERE event_id = ?", [eventID], callback2);
        super.query("DELETE FROM Event_Category WHERE event_id = ?", [eventID], callback2);
        super.query("DELETE FROM Event_Ticket WHERE event_id = ?", [eventID], callback2);
        super.query("DELETE FROM Event WHERE event_id = ?", [eventID], callback)
    }

    addContactInfo(contactInfo, callback){
        super.query("INSERT INTO Contact_Info(name, phone, email, event_id) VALUES (?, ?, ?, ?)", [contactInfo.name, contactInfo.phone, contactInfo.email, contactInfo.eventID], callback)
    }

    updateFiled(eventID, callback){
        console.log("EVENT " + eventID[0]);
        super.query("UPDATE Event SET filed = 1 WHERE event_id = ?", [eventID], callback)
    }
};

function callback2(){
 console.log("Dummy function")
}