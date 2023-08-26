// Description: A terminal application which allows you to manage your departments, roles, and employees from a database.
// TODO: List out options.
  // What would you like to do?
  // view all departments, view all roles, view all employees, add department, add  role, add  employee, update employee role, quit
  // TODO: View all departments
    // Table: id, name
  // TODO: View all roles
    // Table: id, title, department, salary
  // TODO: View all employees
    // Table: id, first_name, last_name, title, department, salary, manager
  // TODO: Add a department
    // Promt: New department name:
  // TODO: ADD role
    // New role name: , salary, department? (With list of departments)
  // TODO: Add employee
    // Employee's first name: , last name:, role(with list), manager(with list)
  // TODO: Update employee role
    // Select employee
    // update new role
// TODO: BONUS
  // TODO: Update emplyee manager
  // TODO: View emplyees by manger
  // TODO: View emplyees by department
  // TODO: Delete departments, roles, and employees
  // TODO: Total utilized budget of a deparment
    //  the combined salaries of all employees in that department
// TODO: Make SQL request async

// TODO: Readme
  // Video of you using it

const Question = require("./question.js")
const Database = require("./database.js")

const db = new Database({dbName: `employee_tracker`})
const question = new Question()

async function start(){
  question
    .setType(`list`)
    .setList([
      `View Departments`,
      `View Roles`,
      `View Employees`,
      `Add Role`,
      `Add Employee`,
      `Update Employee Role`,
      `Quit`,
    ])

  let quit = false
  while(!quit){
    let option = await question.askQuestion(`What would you like to do?`)

    switch(option) {
      case `View Departments`:
        db.viewDepartments()
        break
      case `View Roles`:
        db.viewRoles()
        break
      case `View Employees`:
        db.viewEmployees()
        break
      case `Add Department`:
        db.addDepartment()
        break
      case `Add Role`:
        db.addRole()
        break
      case `Add Employee`:
        db.addEmployee()
        break
      case `Update Employee Role`:
        db.updateEmployeeRole()
        break
      case `Quit`:
        quit = true
        break
    }
  }

  db.closeConnection()
}

start()