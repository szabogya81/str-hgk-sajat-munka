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

const getById = async (id) => {
  const people = await personService.getPeople()
  return people.find(p => p.id === id)
}

const update = async ({ id, firstName, lastName, vaccine }) => {
  const people = await personService.getPeople()
  const personIndex = people.findIndex(p => p.id === id)

  people[personIndex] = {
    id,
    firstName: firstName || people[personIndex].firstName,
    lastName: lastName || people[personIndex].lastName,
    vaccine: vaccine || people[personIndex].vaccine
  }

  personService.savePeople(people)
  return people[personIndex]
}

const getVaccinatedCount = async (req, res, next) => {
  try {
    const people = await personService.getPeople()
    const vaccinatedCount = people.filter(p => p.vaccine.toLowerCase() !== 'none').length

    res.json(vaccinatedCount)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const getVaccinatedPeople = async (req, res, next) => {
  try {
    const people = await personService.getPeople()
    const vaccinatedCount = people.filter(p => p.vaccine.toLowerCase() !== 'none')

    res.json(vaccinatedCount)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const isVaccinated = async (req, res, next) => {
  const id = Number.parseInt(req.params.id)

  if (!id) {
    next(new httpError.BadRequest('Invalid Id'))
  }

  try {
    const person = await getById(id)
    res.json(person.vaccine && person.vaccine.toLowerCase() !== 'none')
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const create = async (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body

  if (!firstName || !lastName || !vaccine) {
    next(new httpError.BadRequest('Missing property(ies).'))
  }

  try {
    const people = await personService.getPeople()
    const newId = people[people.length - 1].id + 1
    const newPerson = { id: newId, firstName, lastName, vaccine }

    people.push(newPerson)
    await personService.savePeople(people)

    res.json(newPerson)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const setVaccine = async (req, res, next) => {
  const id = Number.parseInt(req.params.id)
  const vaccine = req.params.vaccine

  if (!id || !vaccine) {
    next(new httpError.BadRequest('Missing property(ies).'))
  }

  try {
    const newPerson = await update({ id, vaccine })
    res.json(newPerson)
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

const deleteAllHasVaccineType = async (req, res, next) => {
  const vaccine = req.params.vaccine

  if (!vaccine) {
    next(new httpError.BadRequest('Missing vaccine type.'))
  }

  try {
    const people = await personService.getPeople()
    const peopleToSave = people.filter(p => p.vaccine.toLowerCase() !== vaccine.toLowerCase())

    personService.savePeople(peopleToSave)
    res.json({})
  } catch (err) {
    next(new httpError.InternalServerError(err.message))
  }
}

module.exports = Object.freeze({
  getAll,
  getVaccinatedCount,
  getVaccinatedPeople,
  isVaccinated,
  create,
  setVaccine,
  deleteAllHasVaccineType
})
