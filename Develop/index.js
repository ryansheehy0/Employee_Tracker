const Question = require("./question")
const Database = require("./Database/database")
const Option = require("./Options/option")

const db = new Database(`employee_tracker`)
const question = new Question()
const option = new Option(db, question)

option.start()