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
  // TODO: Add comment
// TODO: Readme
  // Video of you using it


const Question = require("./question.js")
const Database = require("./database.js")

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
        const departments = await db.getDepartments()
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
        const department = await question.askQuestion(`New role's department: `)
        await db.addRole(name, salary, department)
        break
      }
      case `Add Employee`:
        await db.addEmployee()
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