const mysql = require("mysql2")

function Database({dbName}){
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: dbName
    })

  db.connect(err => {
    if (err) console.error(`Error connecting to ${dbName}: `, err)
  });

  this.viewDepartments = function(){
    db.query(`select * from department`, (err, results) => {
      if(err){console.log(err); return}
      console.log(results)
    })
  }

  this.closeConnection = function(){
    db.end(err => {
      if(err) console.log(err)
    })
  }

}

module.exports = Database