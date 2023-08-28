const {printTable} = require("console-table-printer")

function View(db){
  async function printQuery(query) {
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
      select e1.id,
            e1.first_name as 'first name',
            e1.last_name as 'last name',
            r.title,
            d.name as department,
            r.salary,
            concat(e2.first_name, ' ', e2.last_name) as manager
      from employee e1
      join role r on e1.role_id = r.id
      join department d on r.department_id = d.id
      left join employee e2 on e1.manager_id = e2.id;
    `)
  }
}


module.exports = View