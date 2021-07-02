1.
use videoStore

2.
db.createCollection("movies", {
    validator: {
      $jsonSchema: {
        properties: {
          title: { bsonType: "string" },
          category: { bsonType: "string" },
          director: { bsonType: "string" }
       }
     }
    }
  }
)

3.
db.movies.insertMany([
   { title: "Raiders Of The Lost Ark", category: "fantasy", director: "Steven Spielberg"},
   { title: "The Terminator", category: "action", director: "James Cameron"},
   { title: "Unforgiven", category: "romantic", director: "Clint Eastwood"},
   { title: "Jurassic Park", category: "fantasy", director: "Steven Spielberg"},
   { title: "Aliens", category: "action", director: "James Cameron"},
   { title: "The Bridges Of Madison County", category: "romantic", director: "Clint Eastwood"},
   { title: "Hook", category: "fantasy", director: "Steven Spielberg"},
   { title: "True Lies", category: "action", director: "James Cameron"},
   { title: "A Perfect World", category: "romantic", director: "Clint Eastwood"},
   { title: "The BFG", category: "fantasy", director: "Steven Spielberg"}
])

4.
db.movies.updateMany( {}, 
  { $set: { "ratings" : [] } })

5.
db.movies.update(
   { title: "Raiders Of The Lost Ark" },
   { $push: { ratings: { $each: [ 4, 5, 5 ] } } }
)

db.movies.update(
   { title: "Aliens" },
   { $push: { ratings: { $each: [ 4, 5 ] } } }
)

db.movies.update(
   { title: "The Terminator" },
   { $push: { ratings: { $each: [ 5, 5, 3 ] } } }
)

6.
db.movies.update( { title: "Raiders Of The Lost Ark"}, { $set: { "releaseYear": 1985 } } )
db.movies.update( { title: "The Terminator"}, { $set: { "releaseYear": 1988 } } )
db.movies.update( { title: "Unforgiven"}, { $set: { "releaseYear": 1993 } } )
db.movies.update( { title: "Jurassic Park"}, { $set: { "releaseYear": 1993 } } )
db.movies.update( { title: "Aliens"}, { $set: { "releaseYear": 1988 } } )
db.movies.update( { title: "Hook"}, { $set: { "releaseYear": 1992 } } )
db.movies.update( { title: "True Lies"}, { $set: { "releaseYear": 1994 } } )
db.movies.update( { title: "A Perfect World"}, { $set: { "releaseYear": 1993 } } )
db.movies.update( { title: "The BFG"}, { $set: { "releaseYear": 2016 } } )

7.
db.movies.updateMany( {}, [{$set: {category: {$toUpper: "$category"} } } ] )