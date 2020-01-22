const Dao = require("./dao.js");

module.exports = class adminDao extends Dao{

    getAllEvents(callback){
        super.query(" SELECT * FROM Event ORDER BY date", [], callback);
    }

    getAllArchived(callback){
        super.query(" SELECT * FROM Event WHERE filed = 1 ORDER BY date", [], callback);
    }

    getAllActive(callback){

        super.query("Select * FROM Event WHERE pending = 0 and filed = 0 and canceled = 0 and date > now() ORDER BY name ", [], callback);

    }

    getNonFiledEvents(callback){
        super.query(" SELECT * FROM Event WHERE filed = 0 ORDER BY date", [], callback);
    }

    getAllCancelled(callback){
        super.query("SELECT * FROM Event WHERE canceled = 1 ORDER BY date", [], callback);
    }

    getEventByID(eventID, callback){
        super.query("SELECT Event.event_id, Event.category_id, Event.name, Event.description, Event.date, Event.place, Event.img_url, Event.artists, Event.tech_rider, Event.hospitality_rider, Event.contract, Event.personnel, Event.filed, Event.pending, Event.canceled, Category.name as category_name FROM Event left join Category on Event.category_id= Category.category_id WHERE Event.event_id=?", [eventID], callback);
    }

    addEvent(event, callback){
        super.query("INSERT INTO Event(name, description, date, place, category_id, img_url, artists, tech_rider, hospitality_rider, personnel, contract) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [event.name, event.description, event.date, event.place, event.categoryID, event.img_url, event.artists, event.tech_rider, event.hospitality_rider, event.personnel, event.contract], callback)
    }

    getCategories(callback){
        super.query("SELECT * FROM Category", [], callback);
    }

    getTicket(callback){
        super.query("SELECT * FROM Ticket_Category", [], callback)
    }

    addTicket(ticket, callback){
        super.query("INSERT INTO Event_Ticket(event_id, ticket_category_id, price, number) VALUES (?, ?, ?, ?)", [ticket.eventID, ticket.ticketID, ticket.price, ticket.amount], callback)
    }

    deleteEvent(eventID, callback){
        super.query("DELETE FROM Comment WHERE event_id = ?", [eventID], callback2);
        super.query("DELETE FROM Contact_Info WHERE event_id = ?", [eventID], callback2);
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

    updatePending(eventID, callback){
        super.query("UPDATE Event SET pending = 0 WHERE event_id = ?", [eventID], callback)
    }

    updateCancel(eventID, callback){
        console.log("ER I DAO ");
        super.query("UPDATE Event SET canceled = 1 WHERE event_id = ?", [eventID], callback)
    }

    getCategoryFromEvent(eventID, callback){
        super.query("SELECT category_id FROM Event WHERE event_id = ?", [eventID], callback)
    }

    getContactinfoForEvent(eventID, callback){
        super.query("SELECT * FROM Contact_Info WHERE event_id = ?", [eventID], callback)
    }

    getTicketById(ticketID, callback){
        super.query("SELECT name FROM Ticket_Category WHERE ticket_category_id = ?", [ticketID], callback)
    }

    getTicketFromEvent(eventID, callback){
        super.query("SELECT event_id, Event_Ticket.ticket_category_id, price, number, name FROM Event_Ticket left join Ticket_Category on Event_Ticket.ticket_category_id = Ticket_Category.ticket_category_id WHERE event_id = ?", [eventID], callback)
    }

    updateEvent(eventID, eventInfo, callback){
        super.query("UPDATE Event SET name = ?, description = ?, date = ?, place = ?, category_id = ?, img_url = ?, artists = ?, tech_rider = ?, hospitality_rider = ?, contract = ?, personnel = ? WHERE event_id = ?", [eventInfo.name, eventInfo.description, eventInfo.date, eventInfo.place, eventInfo.categoryID, eventInfo.img_url, eventInfo.artists, eventInfo.tech_rider, eventInfo.hospitality_rider, eventInfo.contract, eventInfo.personnel, eventID], callback)
    }


    updateContactInfo(eventID, contactInfo, callback){
        super.query("UPDATE Contact_Info SET name = ?, phone = ?, email = ? WHERE event_id = ?", [contactInfo.name, contactInfo.phone, contactInfo.email, eventID], callback)
    }

    deleteTicketsForEvent(eventID, callback){
        super.query("DELETE FROM Event_Ticket WHERE event_id = ?", [eventID], callback)
    }

    getComments(eventID, callback){
        super.query("select name, comment, date from Comment left join User on User.user_id = Comment.user_id where event_id = ? order by date ASC",[eventID],callback)
    }

    addComment(comment, callback){
        super.query("insert into Comment (event_id, user_id, comment, date) values (?,?,?, now())", [comment.eventID, comment.userID, comment.commentText], callback);
    }
};

function callback2(){

}