const { createReadStream } = require('fs')
const { join } = require('path')

const getHtmlResponse = (res, file, statusCode = 200) => {
  if (statusCode === 200) {
    res.writeHead(statusCode, {
      'Content-Type': 'text/html'
    })
    createReadStream(join(__dirname, `../views/${file}.html`)).pipe(res)
  } else {
    res.write('PAGE NOT FOUND')
    res.end()
  }
}

module.exports = getHtmlResponse
