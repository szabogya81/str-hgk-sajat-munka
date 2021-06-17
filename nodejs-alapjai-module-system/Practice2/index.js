const utils = require('./utils')

const userList = [
  {
    firstName: 'John',
    lastName: 'Smith',
    age: 23
  },
  {
    firstName: 'Jane',
    lastName: 'Dallas',
    age: 10
  },
  {
    firstName: 'Mike',
    lastName: 'Higgins',
    age: 35
  }
]

console.log(utils.generateUserList(userList))
console.log(utils.getUserNames(userList))

utils.generateUserList = 10
utils.getUserNames = 20

console.log(utils.generateUserList(userList))
console.log(utils.getUserNames(userList))
