const errorHandler = require('../utils/errorHandler')
const personService = require('../service/person.service')

const getAll = async (req, res, next) => {
  try {
    const people = await personService.getAll()
    res.json(people)
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const getVaccinatedCount = async (req, res, next) => {
  try {
    res.json(await personService.getVaccinatedCount())
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const getVaccinatedPeople = async (req, res, next) => {
  try {
    res.json(await personService.getVaccinatedPeople())
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const isVaccinated = async (req, res, next) => {
  if (!req.params.id) {
    errorHandler.logAndShowError(next,
      new Error(`${req.url} - Invalid Id given.`), 400)
  }

  try {
    const person = await personService.getById(req.params.id)
    res.json(person.vaccine && person.vaccine.toLowerCase() !== 'none')
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const create = async (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body

  if (!firstName || !lastName || !vaccine) {
    errorHandler.logAndShowError(next,
      new Error(
        `${req.url} - Missing property(ies) on query - firstName, lastName, vaccine.`),
      400)
  }

  try {
    const newPerson = { firstName, lastName, vaccine }
    res.json(await personService.create(newPerson))
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const setVaccine = async (req, res, next) => {
  const id = req.params.id
  const vaccine = req.params.vaccine

  if (!id || !vaccine) {
    errorHandler.logAndShowError(next,
      new Error(
        `${req.url} - Missing property(ies) on query - id, vaccine.`), 400)
  }

  try {
    const person = await personService.getById(id)
    person.vaccine = vaccine
    await personService.update(id, person)
    res.json(person)
  } catch (err) {
    errorHandler.logAndShowError(next, err)
  }
}

const deleteAllHasVaccineType = async (req, res, next) => {
  const vaccine = req.params.vaccine

  if (!vaccine) {
    errorHandler.logAndShowError(next,
      new Error(
        `${req.url} - Missing property on query - vaccine.`), 400)
  }

  try {
    await personService.deleteWithVaccineType(vaccine)
    res.json({})
  } catch (err) {
    errorHandler.logAndShowError(next, err)
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
