drop table if exists Event;
drop table if exists Ticket_Category;
drop table if exists Event_Ticket;
drop table if exists Role;
drop table if exists User;
drop table if exists Pending_User;
drop table if exists Contact_Info;
drop table if exists Category;


create table Event
(
  event_id   int auto_increment not null,
  name varchar(45) not null,
  date datetime not null,
  artists varchar(100) not null,
  tech_rider longtext not null,
  hospitality_rider longtext,
  personnel text,
  category_id int not null,
  filed tinyint not null,
  constraint event_pk primary key (event_id)
);

create table Ticket_Category
(
  ticket_category_id int auto_increment not null,
  name varchar(45) not null,
  constraint ticket_category_pk primary key (ticket_category_id)
);

create table Event_Ticket
(
  event_id int not null,
  ticket_category_id int not null,
  price int not null,
  number int not null
);

create table Role
(
  role_id int auto_increment not null,
  role varchar(45) not null,
  constraint role_pk primary key (role_id)
);

-- should User have phone-numbers, since the information is 1-to-1

create table User
(
  user_id int auto_increment not null,
  name varchar(100) not null,
  email varchar(320) not null,
  salt binary(32) not null,
  password_hash varchar(128) not null,
  role_id int not null,
  constraint user_pk primary key (user_id)
);

create table Pending_User
(
  user_id int auto_increment not null,
  name varchar(100) not null,
  email varchar(320) not null,
  salt binary(32) not null,
  password_hash varchar(128) not null,
  approved tinyint not null default 0,
  constraint user_pk primary key (user_id)
);

create table Category
(
  category_id int auto_increment not null,
  name varchar(45) not null,
  constraint category_pk primary key (category_id)
);


alter table Event
  add foreign key (category_id) references Category(category_id);


alter table Event_Ticket
  add foreign key (event_id) references Event(event_id),
  add foreign key (ticket_category_id) references Ticket_Category(ticket_category_id);

alter table User
  add foreign key (role_id) references Role(role_id);