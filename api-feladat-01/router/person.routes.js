const express = require('express')
const router = express.Router()
const personController = require('../controller/person.controller')

router.get('/', async (req, res, next) => {
  return await personController.getAll(req, res, next)
})

router.get('/count', async (req, res, next) => {
  return await personController.getVaccinatedCount(req, res, next)
})

// router.get('/count', async (req, res, next) => {
//   const people = await personService.read()
//   const output = {
//     count: people.filter(p => p.vaccine !== 'none').length
//   }
//   res.json(output)
// })

module.exports = router
