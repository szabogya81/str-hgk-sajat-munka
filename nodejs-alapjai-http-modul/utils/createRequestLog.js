const createRequestLog = (req) => {
  console.log(`Date: ${new Date().toLocaleString('hu-HU')} Url: ${req.url} Method: ${req.method}`)
}

module.exports = createRequestLog
