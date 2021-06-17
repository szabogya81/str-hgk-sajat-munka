const { increaseAndFormatDate } = require('./utils')

const dates = [
  new Date(Date.UTC(2012, 11, 20, 3, 45, 10)),
  new Date(Date.UTC(2015, 10, 10, 8, 23, 27)),
  new Date(Date.UTC(2022, 5, 3, 11, 10, 30))
]

console.log(increaseAndFormatDate(dates))
