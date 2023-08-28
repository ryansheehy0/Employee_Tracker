const mysql = require("mysql2/promise")
const {printTable} = require("console-table-printer")

function Database(dbName){
  // Create connection to db
  const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: dbName
      })

  const {viewDepartments, viewRoles, viewEmployees} = require("./DatabaseFunctions/views")
  const {getDepartments, getDepartmentNames, getRoles, getEmployees} = require("./DatabaseFunctions/gets")
  const {addDepartment, addRole, addEmployee} = require("./DatabaseFunctions/adds")

  // Helper functions
  async function printQuery(query){
    const [results, ] = await db.query(query)
    printTable(results)
  }

  // Views
  this.viewDepartments = viewDepartments
  this.viewRoles = viewRoles
  this.viewEmployees = viewEmployees

  // Gets
  this.getDepartments = getDepartments
  this.getDepartmentNames = getDepartmentNames
  this.getRoles = getRoles
  this.getEmployees = getEmployees

  // Adds
  this.addDepartment = addDepartment
  this.addRole = addRole
  this.addEmployee = addEmployee

  // Updates
  this.updateEmployeeRole = async function(employeeId, roleId){
    try{
      await db.query(`
        update employee
        set role_id = ${roleId}
        where id = ${employeeId};
      `)
    }catch(error){
      console.error(error)
    }
  }

  this.closeConnection = function(){
    db.end(err => {
      if(err) console.log(err)
    })
  }

}

module.exports = Database