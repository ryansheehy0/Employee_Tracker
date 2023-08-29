function Get(db, question){
  this.getTotalUtilizedBudgetOfDepartment = async function() {
    // List which department they want
    const departments = await db.getDepartmentNames()
    question
      .setType(`list`)
      .setList(departments)
      .setValidationFunction(() => {return true})
    const departmentName = await question.askQuestion(`Which department: `)

    const total = await db.getTotalUtilizedBudgetOfDepartment(departmentName)
    console.log(total)
  }

}

module.exports = Get