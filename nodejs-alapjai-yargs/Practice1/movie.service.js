const MovieService = (movieApi) => {
  let movies = (async () => await movieApi.get())()

  const getAllMovies = async () => await movies

  const findMovieById = async (id) => {
    return (await movies).find(movie => movie.id === id)
  }

  const getNextMovieId = async () => {
    const sortedMovies = [...await movies].sort((a, b) => b.id - a.id)
    return sortedMovies[0].id + 1
  }

  const createMovie = async (producer, title) => {
    const movie = { id: await getNextMovieId(), title, producer }
    movies = [...await movies, movie]
    await movieApi.save(movies)
    return movie
  }

  const editMovie = async (id, producer, title) => {
    movies =
        (await movies).map(m => m.id === id ? { id, producer, title } : m)
    await movieApi.save(movies)
    return await findMovieById(id)
  }

  const removeMovie = async (id) => {
    movies = (await movies).filter(m => m.id !== id)
    await movieApi.save(movies)
  }

  return {
    getAllMovies,
    findMovieById,
    createMovie,
    editMovie,
    removeMovie
  }
}
module.exports = MovieService
