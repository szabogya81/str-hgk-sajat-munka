const { createReadStream, createWriteStream } = require('fs')
const path = require('path')
const readline = require('readline')

const processInputByLine = async (inputFile, logger) => {
  const fileStream = createReadStream(inputFile)
  fileStream.on('error', err => logger.error(err.message))

  const outputFilePath = getFileCopyPath(inputFile)
  const outFileStream = createWriteStream(outputFilePath, { flags: 'a' })
  outFileStream.on('error', err => logger.error(err.message))

  try {
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      outFileStream.write(`${capitalizeWords(line).join(' ')}\n`)
    }
  } catch (err) {
    logger.error(err.message)
  }

  logger.success('File transform successful.')
}

const capitalizeWords = (line) => line.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))

const getFileCopyPath = (inputFilePath) => {
  const filePathObject = {
    dir: path.dirname(inputFilePath),
    name: `${path.basename(inputFilePath, '.txt')}Copy`,
    ext: '.txt'
  }
  return path.format(filePathObject)
}

module.exports = {
  processInputByLine
}
