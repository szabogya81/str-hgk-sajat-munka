const conn = new Mongo()
const db = conn.getDB('videoStore')

const movieCount = db.movies.count()
const pages = Math.ceil(movieCount / 3)

for (let i = 0; i < pages; i++) {
  db.movies.find().skip(i * 3).limit(3).forEach(m => {
    print(`${m.title} : ${m.category.toLowerCase()} movie`)
  })
  if (i < pages - 1) {
    print('--page over--')
  }
}
