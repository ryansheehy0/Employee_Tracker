const inquirer = require('inquirer')

function Question(){
  let type = ``
  let list = []

  // Setter methods
    this.setType = function(typeArg){type = typeArg; return this;}
    this.setList = function(listArg){list = listArg; return this;}

  this.askQuestion = function(question){
    if(!type) throw Error(`Needs to setType.`)

    let prompt = {
      type: type,
      name: `name`,
      message: question,
      choices: type === `list` ? list : undefined,
    }

    return new Promise((res, rej) => {
      inquirer.prompt([prompt])
      .then(answer => {res(answer.name)})
      .catch(error => {rej(error)})
    })
  }

}

module.exports = Question