async function getDepartments(){
  const [results, ] = await  db.query(`select is as value, name from department;`)
  return results
}

async function getDepartmentNames(){
  const [results, ] = await  db.query(`select name from department;`)
  // Convert array of objects to array of strings
  let departments = []
  results.forEach(result => {
    departments.push(result.name)
  })

  return departments
}

async function getRoles(){
  const [results, ] = await db.query(`select id as value, title as name from role;`)
  return results
}

async function getEmployees(){
  const [results, ] = await db.query(`select id as value, concat(first_name, ' ', last_name) as name from employee;`)
  return results
}

module.exports = {getDepartments, getDepartmentNames, getRoles, getEmployees}