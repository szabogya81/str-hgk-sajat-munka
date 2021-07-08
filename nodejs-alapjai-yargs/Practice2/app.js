const yargs = require('yargs')
const ProductApi = require('./product.api')
const ProductService = require('./product.service')
const { dbFilePath, propName } = require('./config')

const productApi = ProductApi(dbFilePath, propName)

const {
  sum,
  avg,
  lessThan
} = ProductService(productApi)

yargs
  .version('1.0.0')
  .usage('Usage: <comman> [options]')
  .command({
    command: 'sum',
    describe: 'Get total value of all the products',
    handler: async () =>
      console.log(`Total value of all the products:\n${await sum()}`)
  })
  .command({
    command: 'avg',
    describe: 'Get total value of all the products divided by total product count',
    handler: async () =>
      console.log(`Average price of all the products:\n${await avg()}`)
  })
  .command({
    command: 'lessthan',
    describe: 'Get products where count less than the given value',
    builder: {
      count: {
        alias: 'c',
        describe: 'Count to be less than',
        type: 'number',
        demandOption: true
      }
    },
    handler: async ({ count }) =>
      console.log(`Products with less count than ${count}\n`, await lessThan(count))
  })
  .locale('en')
  .strict()
  .help()
  .parse()
