function Get(db) {
  this.getDepartments = async function() {
    const [results, ] = await db.query(`select id as value, name from department;`)
    return results
  }

  this.getDepartmentNames = async function() {
    const [results, ] = await db.query(`select name from department;`)
    // Convert array of objects to array of strings
    return results.reduce((departments, result) => {
      departments.push(result.name)
      return departments
    }, [])
  }

  this.getRoles = async function() {
    const [results, ] = await db.query(`select id as value, title as name from role;`)
    return results
  }

  this.getEmployees = async function() {
    const [results, ] = await db.query(`select id as value, concat(first_name, ' ', last_name) as name from employee;`)
    return results
  }

  this.getTotalUtilizedBudgetOfDepartment = async function(departmentName) {
    const [results, ] = await db.query(`
      select sum(salary) as salary from employee
      join role on employee.role_id = role.id
      join department on role.department_id = department.id
      where department.name = '${departmentName}';
    `)
    return results[0].salary
  }

}

module.exports = Get