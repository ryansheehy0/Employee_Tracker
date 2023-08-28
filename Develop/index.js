// TODO: BONUS
  // TODO: Update emplyee manager
  // TODO: View emplyees by manger
  // TODO: View emplyees by department
  // TODO: Delete departments, roles, and employees
  // TODO: Total utilized budget of a deparment
    //  the combined salaries of all employees in that department
  // TODO: Add comment
// TODO: Readme
  // Content management system(CMS)
  // Video of you using it


const Question = require("./question.js")
const Database = require("./Database/database.js")

const db = new Database(`employee_tracker`)
const question = new Question()

async function start(){
  let quit = false
  while(!quit){

    question
      .setType(`list`)
      .setList([
        `View Departments`,
        `View Roles`,
        `View Employees`,
        `Add Department`,
        `Add Role`,
        `Add Employee`,
        `Update Employee Role`,
        `Quit`,
      ])
      .setValidationFunction(() => true)
    let option = await question.askQuestion(`What would you like to do?`)

    switch(option) {
      case `View Departments`:
        await db.viewDepartments()
        break
      case `View Roles`:
        await db.viewRoles()
        break
      case `View Employees`:
        await db.viewEmployees()
        break
      case `Add Department`: {
        // Get department names
        const departments = await db.getDepartmentNames()

        // Set questions
        question
          .setType(`input`)
          .setValidationFunction((input) => {
            if(departments.includes(input)){
              return `There's already a department named ${input}. Please give a new name.`
            }
            return true
          })

        const name = await question.askQuestion(`New department's name: `)
        await db.addDepartment(name)
        break
      }
      case `Add Role`:{
        question
          .setType(`input`)
          .setValidationFunction(() => true)
        const name = await question.askQuestion(`New role's name: `)
        const salary = await question.askQuestion(`New role's salary: `)
        const departments = await db.getDepartments()
        question
          .setType(`list`)
          .setList(departments)
        const departmentId = await question.askQuestion(`New role's department: `)
        await db.addRole(name, salary, departmentId)
        break
      }
      case `Add Employee`: {
        // Get names
        question
          .setType('input')
          .setValidationFunction(() => true)
        const first_name = await question.askQuestion(`New employee's first name: `)
        const last_name = await question.askQuestion(`New employee's last name: `)

        // Get role
        const roles = await db.getRoles()
        question
          .setType('list')
          .setList(roles)
        const roleId = await question.askQuestion(`New employee's role: `)

        // Get manager
        const employees = await db.getEmployees()
        employees.push({name: 'None', value: 0})
        question.setList(employees)
        let managerId = await question.askQuestion(`New employee's manager: `)
        if(managerId === 0)managerId = null // So the manager is null in SQL

        await db.addEmployee(first_name, last_name, roleId, managerId)
        break
      }
      case `Update Employee Role`:{
        // Get employee Id
        const employees = await db.getEmployees()
        question
          .setType(`list`)
          .setList(employees)
        const employeeId = await question.askQuestion(`Employee: `)

        // Get new role
        const roles = await db.getRoles()
        question
          .setList(roles)
        const roleId = await question.askQuestion(`New role: `)

        await db.updateEmployeeRole(employeeId, roleId)
        break
      }
      case `Quit`:
        quit = true
        break
    }
  }

  db.closeConnection()
}

start()