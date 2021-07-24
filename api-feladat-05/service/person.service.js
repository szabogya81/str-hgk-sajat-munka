const Person = require('../models/person.model')

const getById = async (id) => await Person.findById(id)

const getAll = async () => await Person.find()

const create = async (personData) => {
  const newPerson = new Person(personData)
  return await newPerson.save()
}

const update = async (id, personData) => {
  await Person.findByIdAndUpdate(id, personData, {
    useFindAndModify: false,
    new: true
  })
}

const remove = async (id) => await Person.findByIdAndDelete(id)

const getVaccinatedCount = async () => {
  return await Person.find({ vaccine: { $not: { $regex: /none/i } } }).countDocuments()
}

const getVaccinatedPeople = async () => {
  return await Person.find({ vaccine: { $not: { $regex: /none/i } } })
}

const deleteWithVaccineType = async (vaccine) => {
  await Person.deleteMany({ vaccine: { $regex: new RegExp(vaccine, 'i') } })
}

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
  getVaccinatedCount,
  getVaccinatedPeople,
  deleteWithVaccineType
}
