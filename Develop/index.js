// TODO: BONUS
  // TODO: Update emplyee manager
  // TODO: View emplyees by manger
  // TODO: View emplyees by department
  // TODO: Delete departments, roles, and employees
  // TODO: Total utilized budget of a deparment
    //  the combined salaries of all employees in that department
// TODO: Readme
  // Video of you using it


const Question = require("./question")
const Database = require("./Database/database")
const Option = require("./Options/option")

const db = new Database(`employee_tracker`)
const question = new Question()
const option = new Option(db, question)

option.start()