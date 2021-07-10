0. Használjuk a videoStore adatbázist!

  Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:

_id: kötelező megadni és csak egész számokból (integer) állhat
'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
'movies' mező: 'array' lehet és kötelező megadni
'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)

use videoStore

db.createCollection("cinemas", {
    validator: {
      $jsonSchema: {
        required: [ "_id", "name", "movies", "address" ],
        properties: {
          _id: { bsonType: "int" },
          name: { bsonType: "string" },
          movies: { bsonType: "array" },
          address: {
            bsonType: "object",
            properties: {
             city: {
              bsonType: "string"
            }
           }
         }
        }
      }
    }
  }
)

1. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!

let newMovies = db.movies.find({}, {_id:1}).sort( { "releaseYear":-1 } ).limit(4).toArray()

db.cinemas.insertOne({ "_id": NumberInt(1), "name": "Westend", "movies": [], "address": { "city": "Budapest"} })

db.cinemas.update(
  { _id: 1 },
  { $push: { movies: { $each: newMovies } } }
)

let oldMovies = db.movies.find({}, {_id:1}).sort( { "releaseYear":1 } ).limit(3).toArray()

db.cinemas.insertOne({ "_id": NumberInt(2), "name": "MOZZZI", "movies": [], "address": { "city": "Debrecen"} })

db.cinemas.update(
  { _id: 2 },
  { $push: { movies: { $each: oldMovies } } }
)

let avgMovies = db.movies.find({}, {_id:1}).sort( { "releaseYear":1 } ).skip(4).limit(3).toArray()

db.cinemas.insertOne({ "_id": NumberInt(3), "name": "Kino", "movies": [], "address": { "city": "Miskolc"} })

db.cinemas.update(
  { _id: 3 },
  { $push: { movies: { $each: avgMovies } } }
)

2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!

db.cinemas.aggregate([
  { 
    $match: { "_id": 1 } 
  },
  {
     $lookup:
       {
         from: "movies",
         localField: "movies._id",
         foreignField: "_id",
         as: "movies"
       }
  }
]).pretty()

3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!

db.cinemas.aggregate([
  { 
    $match: { "_id": 1 } 
  },
  {
     $lookup:
       {
         from: "movies",
         localField: "movies._id",
         foreignField: "_id",
         as: "movies"
       }
  },
  {
    $project: {
      "_id": 0,
      "name": 0,
      "address": 0
    }
  }
]).pretty()

4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.

Done in 2.4

5. Kérdezzük le az egyik rendező által rendezett filmek adatait!

db.directors.aggregate([
  { 
    $match: { "name": "Steven Spielberg" } 
  },
  {
     $lookup:
       {
         from: "movies",
         localField: "movies",
         foreignField: "_id",
         as: "movies"
       }
  },
  {
    $project: {
      "_id": 0
    }
  }
]).pretty()


6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!

db.directors.aggregate([
  { 
    $match: { "name": "James Cameron" } 
  },
  {
     $lookup:
       {
         from: "movies",
         localField: "movies",
         foreignField: "_id",
         as: "movieTitles"
       }
  },
  {
    $project: {
      "_id": 0,
      "birthYear" : 0,
      "movies": 0,
      "movieTitles._id": 0,
      "movieTitles.category": 0,
      "movieTitles.ratings": 0,
      "movieTitles.releaseYear" : 0
    }
  }
]).pretty()

7. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!

db.movies.aggregate([
   { $project: { _id: 0, title: 1, rateAvg: { $avg: "$ratings"} } },
   { $sort: { rateAvg: -1} },
   { $limit: 1 }
])