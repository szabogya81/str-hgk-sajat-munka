const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MovieApi = require('./movies.api')
const MovieService = require('./movie.service')
const { dbFilePath, propName } = require('./config')

const movieApi = MovieApi(dbFilePath, propName)

const {
  editMovie,
  createMovie,
  removeMovie,
  getAllMovies,
  findMovieById
} = MovieService(movieApi)

yargs
  .version('1.0.0')
  .usage('Usage: <comman> [options]')
  // .command('get', 'Get all movies', () => console.log(movies))
  .command({
    command: 'get',
    describe: 'Get all movie',
    handler: async () => console.log(await getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Get a movie by Id',
    builder: { id },
    handler: async ({ id }) => console.log(await findMovieById(id))
  })
  .command({
    command: 'edit',
    describe: 'Edit a Movie',
    builder: { id, producer, title },
    handler: async ({ id, producer, title }) => {
      console.log(await editMovie(id, producer, title))
    }
  })
  .command({
    command: 'create',
    describe: 'Create new Movie',
    builder: { producer, title },
    handler: async ({ producer, title }) => {
      console.log(await createMovie(producer, title))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: async ({ id }) => {
      await removeMovie(id)
      console.log(`Movie with ID: ${id} deleted`)
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse()
  // Nem kell így mindig kiírni, hogy process.argv - elég az args
