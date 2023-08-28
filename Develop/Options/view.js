function View(db){
  this.viewDepartments = async function(){
    await db.viewDepartments()
  }

  this.viewRoles = async function(){
    await db.viewRoles()
  }

  this.viewEmployees = async function(){
    await db.viewEmployees()
  }
}

module.exports = View