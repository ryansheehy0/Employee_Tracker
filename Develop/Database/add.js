function Add(db) {
  this.addDepartment = async function(name) {
    try{
      await db.query(`
        insert into department (name)
        values ('${name}');
      `)
    }catch(error){
      console.error(error)
    }
  }

  this.addRole = async function(name, salary, departmentId){
    try{
      await db.query(`
        insert into role (title, department_id, salary)
        values ('${name}', ${departmentId}, ${salary});
      `)
    }catch(error){
      console.error(error)
    }
  }

  this.addEmployee = async function(first_name, last_name, roleId, managerId){
    try{
      await db.query(`
        insert into employee (first_name, last_name, role_id, manager_id)
        values ('${first_name}', '${last_name}', ${roleId}, ${managerId});
      `)
    }catch(error){
      console.error(error)
    }
  }
}

module.exports = Add