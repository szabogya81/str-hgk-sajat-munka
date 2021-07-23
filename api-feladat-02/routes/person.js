const express = require('express')
const router = express.Router()

const personController = require('../controller/person.controller')

router.get('/', async (req, res, next) => {
  return await personController.getAll(req, res, next)
})

router.get('/count', async (req, res, next) => {
  return await personController.getVaccinatedCount(req, res, next)
})

router.get('/vaccinated', async (req, res, next) => {
  return await personController.getVaccinatedPeople(req, res, next)
})

router.get('/:id/vaccinated', async (req, res, next) => {
  return await personController.isVaccinated(req, res, next)
})

router.post('/', async (req, res, next) => {
  return await personController.create(req, res, next)
})

router.put('/:id/:vaccine', async (req, res, next) => {
  return await personController.setVaccine(req, res, next)
})

router.delete('/:vaccine', async (req, res, next) => {
  return await personController.deleteAllHasVaccineType(req, res, next)
})

module.exports = router
