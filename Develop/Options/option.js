const View = require("./view")
const Add = require("./add")
const Update = require("./update")
const Get = require("./get")

function Option(db, question) {
  this.start = async function() {
    // Create objects
    const view = new View(db)
    const add  = new Add(db, question)
    const update = new Update(db, question)
    const get = new Get(db, question)

    let quit = false
    while(!quit){
      // Ask for options
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
          `Total Utilized Budget of Department`,
          `Quit`,
        ])
        .setValidationFunction(() => true)
      let option = await question.askQuestion(`What would you like to do?`)

      // Handle options
      switch(option) {
        case `View Departments`: await view.viewDepartments()
          break
        case `View Roles`: await view.viewRoles()
          break
        case `View Employees`: await view.viewEmployees()
          break
        case `Add Department`: await add.addDepartment()
          break
        case `Add Role`: await add.addRole()
          break
        case `Add Employee`: await add.addEmployee()
          break
        case `Update Employee Role`: await update.updateEmployeeRole()
          break
        case `Total Utilized Budget of Department`: await get.getTotalUtilizedBudgetOfDepartment()
          break
        case `Quit`:
          quit = true
          break
      }
    }
  db.closeConnection()
  }
}

module.exports = Option