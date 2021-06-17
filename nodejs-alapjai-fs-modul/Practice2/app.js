const { archiveFile, deleteFiles } = require('./utils')

const sourceFilePath = './Output/input.txt'

try {
  archiveFile(sourceFilePath)
} catch (err) {
  console.log('Error during archiving. ', err.message)
}

deleteFiles(sourceFilePath)
