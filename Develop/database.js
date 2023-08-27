const mysql = require("mysql2/promise")
const {printTable} = require("console-table-printer")

function Database(dbName){
  const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: dbName
      })

  async function printQuery(query){
    const [results, ] = await db.query(query)
    printTable(results)
  }

  this.viewDepartments = async function(){
    await printQuery(`select * from department;`)
  }

  this.viewRoles = async function(){
    await printQuery(`
      select role.id, title, department.name as department, salary
      from role
      join department on role.department_id = department.id;
    `)
  }

  this.viewEmployees = async function(){
    await printQuery(`
      SELECT e1.id,
            e1.first_name AS 'first name',
            e1.last_name AS 'last name',
            r.title,
            d.name AS department,
            r.salary,
            CONCAT(e2.first_name, ' ', e2.last_name) AS manager
      FROM employee e1
      JOIN role r ON e1.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee e2 ON e1.manager_id = e2.id;
    `)
    /*
      select employee.id, first_name as 'first name', last_name as 'last name', role.title, department.name as department, role.salary, employee.manager_id as manager
      from employee
      join role on employee.role_id = role.id
      join department on role.department_id = department.id
      join employee on employee.manager_id = employee.id;
    */
  }

  this.addDepartment = async function(name){
    try{
      await db.query(`
        insert into department (name)
        values ('${name}');
      `)
    }catch(error){
      console.error(error)
    }
  }

  this.getDepartments = async function(){
    const [results, ] = await  db.query(`select name from department;`)
    let departments = []
    results.forEach(result => {
      departments.push(result.name)
    })
    return departments
  }

  this.addRole = async function(name, salary, department){
    try{
      // Get the department id from the department
      const [result, ] = await db.query(`
        select id from department
        where department.name = '${department}';
      `)
      const departmentId = result[0].id

      // Make a new role
      await db.query(`
        insert into role (title, department_id, salary)
        values ('${name}', ${departmentId}, ${salary});
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