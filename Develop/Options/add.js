function Add(db, question){
  this.addDepartment = async function(){
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
  }

  this.addRole = async function(){
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
  }

  this.addEmployee = async function(){
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
  }
}

module.exports = Add