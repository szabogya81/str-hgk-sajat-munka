1. init
use videoStore
let nextId = 1

const getDistinctDirectors = () => {
   return db.movies.distinct("director")
}

const getDirectorFilms = (dirName) => {
   let films = []
   db.movies.find({director: dirName}, {_id:1}).forEach(i => films.push(i._id))
   return films
}

2.
db.createCollection("directors", {
    validator: {
      $jsonSchema: {
        properties: {
         _id: { bsonType: "int" },
         name: { bsonType: "string" },
         birthYear: { bsonType: "int" },
         movies: { bsonType: "array" }
       }
     }
    }
  }
)

3.
db.directors.insertOne({
  _id: NumberInt(nextId++),
  name: "Steven Spielberg",
  birthYear: NumberInt(1946),
  movies: []
})

db.directors.insertOne({
  _id: NumberInt(nextId++),
  name: "Clint Eastwood",
  birthYear: NumberInt(1930),
  movies: []
})

db.directors.insertOne({
  _id: NumberInt(nextId++),
  name: "James Cameron",
  birthYear: NumberInt(1954),
  movies: []
})

4.
/*
db.directors.find()
db.movies.find({}, {director:1, title:1}).sort({director: 1})
*/

db.movies.distinct("director").forEach(
   director => db.directors.update(
      { name: director },
      { $push: { movies: { $each: getDirectorFilms(director) } } }
   )
)

5.
db.directors.find().pretty()

6.
db.movies.updateMany({}, { $unset: { director : "" } })

7.
db.movies.find({releaseYear: {$lt: 2000}})
db.movies.find({releaseYear: {$lte: 2000}})
db.movies.find({releaseYear: {$gt: 1996}})
db.movies.find({releaseYear: {$gte: 1996}})

8.
db.movies.find({ releaseYear: { $gt: 1985, $lt: 2000 }})
db.movies.find({ $and: [{ releaseYear: { $gt: 1985}}, { releaseYear: { $lt: 2000 }}]})

9.
db.movies.find({ releaseYear: { $gt: 1985, $lt: 2000 }, category: "ACTION" })

10.db.movies.find({ category: { $ne: "FANTASY" }})
