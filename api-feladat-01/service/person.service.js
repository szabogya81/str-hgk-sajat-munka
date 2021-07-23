const { readFile } = require('fs').promises
const { join } = require('path')

const getPeople = async () => {
  const jsonContent = await readFile(
    join(__dirname, '../db/person.json'),
    'utf8'
  )

  return JSON.parse(jsonContent)
}

module.exports = Object.freeze({
  getPeople
})
