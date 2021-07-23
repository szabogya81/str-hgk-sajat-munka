const { readFile, writeFile } = require('fs').promises
const { join } = require('path')

const getPeople = async () => {
  const jsonContent = await readFile(
    join(__dirname, '../db/person.json'),
    'utf8'
  )

  return JSON.parse(jsonContent)
}

const savePeople = async (people) => {
  await writeFile(join(__dirname, '../db/person.json'), JSON.stringify(people))
}

module.exports = Object.freeze({
  getPeople,
  savePeople
})
