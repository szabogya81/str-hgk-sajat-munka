const { mkdir, writeFile } = require('fs').promises

const outputRoot = './Output'
const controllersFolder = '/controllers'
const routersFolder = '/routers'
const viewsFolder = '/views'

const createFolderStructure = () => {
  mkdir(outputRoot + controllersFolder)
    .then(() => writeFile(outputRoot + controllersFolder + '/site.controller.js', ''))
    .then(() => {
      mkdir(outputRoot + routersFolder)
        .then(() => writeFile(outputRoot + routersFolder + '/site.router.js', ''))
    }
    )
    .then(() => {
      mkdir(outputRoot + viewsFolder)
        .then(() => writeFile(outputRoot + viewsFolder + '/index.html', ''))
    }
    )
    .then(() => writeFile(outputRoot + '/app.js', ''))
    .catch((err) => console.log('Error occured while creating folder structure: ', err.message))
}

module.exports = Object.freeze(
  {
    createFolderStructure
  }
)
