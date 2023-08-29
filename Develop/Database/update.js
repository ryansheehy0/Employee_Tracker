function Update(db){
  this.updateEmployeeRole = async function(employeeId, roleId) {
    try{
      await db.query(`
        update employee
        set role_id = ${roleId}
        where id = ${employeeId};
      `)
    }catch(error){
      console.error(error)
    }
  }

  this.closeConnection = async function() {
    db.end(err => {
      if(err) console.log(err)
    })
  }
}

module.exports = Update