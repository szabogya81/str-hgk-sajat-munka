const generateUserList = (users = [{}]) =>
  users.map(u => (
    {
      isAdult: u.age > 18,
      fullName: `${u.firstName} ${u.lastName}`
    }))

const getUserNames = (users = [{}]) =>
  users.map(u => `${u.firstName} ${u.lastName}`)
    .join(', ')

module.exports = Object.freeze(
  {
    generateUserList,
    getUserNames
  }
)
