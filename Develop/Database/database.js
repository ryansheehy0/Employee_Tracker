const mysql = require("mysql2/promise")
const View = require("./view")
const Get = require("./get")
const Add = require("./add")
const Update = require("./update")

function Database(dbName) {
  // Create connection to db
  const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: dbName
      })

  // Objects
  const view = new View(db)
  const get = new Get(db)
  const add = new Add(db)
  const update = new Update(db)

  // Views
  this.viewDepartments = view.viewDepartments
  this.viewRoles = view.viewRoles
  this.viewEmployees = view.viewEmployees

  // Gets
  this.getDepartments = get.getDepartments
  this.getDepartmentNames = get.getDepartmentNames
  this.getRoles = get.getRoles
  this.getEmployees = get.getEmployees
  this.getTotalUtilizedBudgetOfDepartment = get.getTotalUtilizedBudgetOfDepartment

  // Adds
  this.addDepartment = add.addDepartment
  this.addRole = add.addRole
  this.addEmployee = add.addEmployee

  // Updates
  this.updateEmployeeRole = update.updateEmployeeRole
  this.closeConnection = update.closeConnection
}

module.exports = Database