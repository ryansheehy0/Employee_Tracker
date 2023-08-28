async function printQuery(query){
  const [results, ] = await db.query(query)
  printTable(results)
}

async function viewDepartments(){
  await printQuery(`select * from department;`)
}

async function viewRoles(){
  await printQuery(`
    select role.id, title, department.name as department, salary
    from role
    join department on role.department_id = department.id;
  `)
}

async function viewEmployees(){
  await printQuery(`
    select e1.id,
          e1.first_name as 'first name',
          e1.last_name as 'last name',
          r.title,
          d.name as department,
          r.salary,
          concat(e2.first_name, ' ', e2.last_name) as manager
    from employee e1
    join role r on e1.role_id = r.id
    join department d on r.department_id = d.id
    left join employee e2 on e1.manager_id = e2.id;
  `)
}

module.exports = {viewDepartments, viewRoles, viewEmployees}