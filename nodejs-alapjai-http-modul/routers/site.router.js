const SiteController = require('../controllers/site.controller')

const router = {
  '/': (res) => SiteController.forIndex(res),
  '/about': (res) => SiteController.forAbout(res),
  '/contact': (res) => SiteController.forContact(res),
  '/404': (res) => SiteController.for404(res)
}

module.exports = Object.freeze(router)
