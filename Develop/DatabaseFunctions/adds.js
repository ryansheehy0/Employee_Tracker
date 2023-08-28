async function addDepartment(name){
  try{
    await db.query(`
      insert into department (name)
      values ('${name}');
    `)
  }catch(error){
    console.error(error)
  }
}

async function addRole(name, salary, departmentId){
  try{
    await db.query(`
      insert into role (title, department_id, salary)
      values ('${name}', ${departmentId}, ${salary});
    `)
  }catch(error){
    console.error(error)
  }
}

async function addEmployee(first_name, last_name, roleId, managerId){
  try{
    await db.query(`
      insert into employee (first_name, last_name, role_id, manager_id)
      values ('${first_name}', '${last_name}', ${roleId}, ${managerId});
    `)
  }catch(error){
    console.error(error)
  }
}

module.exports = {addDepartment, addRole, addEmployee}