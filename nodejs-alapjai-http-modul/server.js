const { createServer } = require('http')
const SiteRouter = require('./routers/site.router')
const createRequestLog = require('./utils/createRequestLog')

const port = process.env.PORT || 8080

createServer((req, res) => {
  SiteRouter[req.url]
    ? SiteRouter[req.url](res)
    : SiteRouter['/404'](res)

  createRequestLog(req)
})
  .on('error', err => console.log(`Server error:  ${err.message}`))
  .listen(port)
