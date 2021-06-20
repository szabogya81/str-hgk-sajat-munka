const { processInputByLine } = require('./utils')
const Logger = require('./Logger')

const logger = new Logger()
const inputFile = 'input.txt'

processInputByLine(inputFile, logger)
