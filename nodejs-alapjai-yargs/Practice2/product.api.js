const { readFile, writeFile } = require('fs').promises

const ProductApi = (path, prop) => ({
  async get () {
    const data = await readFile(path)
    return JSON.parse(data)[prop]
  },

  async save (data) {
    await writeFile(path, JSON.stringify({ [prop]: data }))
  }
})

module.exports = ProductApi
