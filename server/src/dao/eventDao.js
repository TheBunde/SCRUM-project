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
        super.query("SELECT Event.event_id, Event.name, Event.description, Event.date, Event.place, Event.img_url, Event.artists, Event.tech_rider, Event.hospitality_rider, Event.contract, Event.personnel, Event.filed, Event.pending, Category.name as category_name FROM Event left join Event_Category on Event_Category.event_id = Event.event_id left join Category on Event_Category.category_id = Category.category_id WHERE Event.event_id=?", [eventID], callback);
    }

    addEvent(event, callback){
        super.query("INSERT INTO Event(name, description, date, place, img_url, artists, tech_rider, hospitality_rider, personnel, contract) VALUES (?,?,?,?,?,?,?,?,?,?)", [event.name, event.description, event.date, event.place, event.img_url, event.artists, event.tech_rider, event.hospitality_rider, event.personnel, event.contract], callback)
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

    getCategoryFromEvent(eventID, callback){
        super.query("SELECT category_id FROM Event_Category WHERE event_id = ?", [eventID], callback)
    }

    getContactinfoForEvent(eventID, callback){
        super.query("SELECT * FROM Contact_Info WHERE event_id = ?", [eventID], callback)
    }

    getTicketById(ticketID, callback){
        super.query("SELECT name FROM Ticket_Category WHERE ticket_category_id = ?", [ticketID], callback)
    }

    getTicketFromEvent(eventID, callback){
        super.query("SELECT * FROM Event_Ticket WHERE event_id = ?", [eventID], callback)
    }

    updateEvent(eventID, eventInfo, callback){
        super.query("UPDATE Event SET name = ?, description = ?, date = ?, place = ?, img_url = ?, artists = ?, tech_rider = ?, hospitality_rider = ?, contract = ?, personnel = ? WHERE event_id = ?", [eventInfo.name, eventInfo.description, eventInfo.date, eventInfo.place, eventInfo.img_url, eventInfo.artists, eventInfo.tech_rider, eventInfo.hospitality_rider, eventInfo.contract, eventInfo.personnel, eventID], callback)
    }

    updateEventCategory(eventId, categoryId, callback){
        super.query("UPDATE Event_Category SET category_id = ? WHERE event_id = ?", [categoryId, eventId], callback)
    }

    updateContactInfo(eventID, contactInfo, callback){
        super.query("UPDATE Contact_Info SET name = ?, phone = ?, email = ? WHERE event_id = ?", [contactInfo.name, contactInfo.phone, contactInfo.email, eventID], callback)
    }

    updateEventTicket(eventID, ticketInfo, callback){
        super.query("UPDATE Event_Ticket SET ticket_category_id = ?, number = ? WHERE event_id = ?", [ticketInfo.ticketID, ticketInfo.amount, eventID], callback)
    }
};

function callback2(){
 console.log("Dummy function")
}