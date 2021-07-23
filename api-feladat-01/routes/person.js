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

module.exports = router
