function Update(db, question){
  this.updateEmployeeRole = async function(){
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
  }
}

module.exports = Update