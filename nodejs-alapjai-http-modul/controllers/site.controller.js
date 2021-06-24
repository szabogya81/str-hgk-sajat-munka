const getHtmlResponse = require('../utils/getHtmlResponse')

const forIndex = (res) => getHtmlResponse(res, 'index')

const forAbout = (res) => getHtmlResponse(res, 'about')

const forContact = (res) => getHtmlResponse(res, 'contact')

const for404 = (res) => getHtmlResponse(res, '', 404)

module.exports = Object.freeze({
  forIndex,
  forAbout,
  forContact,
  for404
})
