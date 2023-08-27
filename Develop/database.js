const mysql = require("mysql2")
const {printTable} = require("console-table-printer")

function Database(dbName){
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: dbName
    })

  db.connect(err => {
    if (err) console.error(`Error connecting to ${dbName}: `, err)
  });

  function printQuery(query){
    db.query(query, (err, results) => {
      if(err){console.log(err); return}
      printTable(results)
    })
  }

  this.viewDepartments = function(){
    printQuery(`select * from department;`)
  }

  this.viewRoles = function(){
    printQuery(`
      select role.id, title, department.name as department, salary
      from role
      join department on role.department_id = department.id;
    `)
  }

  this.viewEmployees = function(){
    printQuery(`
      select employee.id, first_name as 'first name', last_name as 'last name', role.title, department.name as department, role.salary, employee.manager_id as manager
      from employee
      join role on employee.role_id = role.id
      join department on role.department_id = department.id
      join employee on employee.manager_id = employee.id;
    `)
  }

  this.closeConnection = function(){
    db.end(err => {
      if(err) console.log(err)
    })
  }

}

module.exports = Database