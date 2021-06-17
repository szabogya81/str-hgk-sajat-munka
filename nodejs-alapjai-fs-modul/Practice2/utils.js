const { createReadStream, createWriteStream, unlink } = require('fs')
const path = require('path')
const { createGzip } = require('zlib')

const getArchiveFilePath = (sourceFilePath) =>
`${path.dirname(sourceFilePath)}/${path.basename(sourceFilePath, path.extname(sourceFilePath))}.bak`

const archiveFile = (sourceFilePath) => {
  const readStream = createReadStream(sourceFilePath)
  const writeStream = createWriteStream(getArchiveFilePath(sourceFilePath))
  const compressedStream = createWriteStream(`${getArchiveFilePath(sourceFilePath)}.gz`)

  readStream.pipe(writeStream)

  readStream
    .pipe(createGzip())
    .pipe(compressedStream)
}

const errorHandler = (err, filePath) => {
  if (err) console.log(`Error during delete. File: ${filePath}`, err.message)
}

const deleteFiles = (sourceFilePath) => {
  unlink(sourceFilePath, errorHandler)
  unlink(getArchiveFilePath(sourceFilePath), errorHandler)
}

module.exports = Object.freeze(
  {
    archiveFile,
    deleteFiles
  }
)
