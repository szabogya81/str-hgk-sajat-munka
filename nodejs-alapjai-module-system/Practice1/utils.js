const increaseDate = (date, dayCount = 3) =>
  date.setDate(date.getDate() + dayCount)

const increaseAndFormatDate = (dates) =>
  dates.map(d => new Date(increaseDate(d)).toLocaleDateString('hu-HU'))

module.exports = Object.freeze(
  {
    increaseAndFormatDate
  }
)
