const httpError = require('http-errors')
const personService = require('../service/person.service')

const getAll = async (req, res, next) => {
  try {
    const people = await personService.getPeople()
    res.json(people)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const getVaccinatedCount = async (req, res, next) => {
  try {
    const people = await personService.getPeople()
    const vaccinatedCount = people.filter(p => p.vaccine !== 'None').length

    res.json(vaccinatedCount)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const getVaccinatedPeople = async (req, res, next) => {
  try {
    const people = await personService.getPeople()
    const vaccinatedCount = people.filter(p => p.vaccine !== 'None')

    res.json(vaccinatedCount)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

module.exports = Object.freeze({
  getAll,
  getVaccinatedCount,
  getVaccinatedPeople
})
