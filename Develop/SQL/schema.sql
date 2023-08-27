drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;

create table department (
  id int not null auto_increment,
  name varchar(30) not null,
  primary key (id),
  unique (name)
);

create table role (
  id int not null auto_increment,
  title varchar(30) not null,
  salary decimal,
  department_id int,
  primary key (id),
  foreign key (department_id) references department(id),
  unique (title)
);

create table employee (
  id int not null auto_increment,
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int,
  primary key (id),
  foreign key (role_id) references role(id),
  foreign key (manager_id) references employee(id)
);