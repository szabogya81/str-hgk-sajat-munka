const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('config')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml')

const errorHandler = require('./utils/errorHandler')
const indexRouter = require('./routes/index')
const personRouter = require('./routes/person.routes')

const logger = require('./utils/logger')

const app = express()

const { host } = config.get('database')
mongoose.connect(`mongodb://${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(logger.info('Connected to MongoDB'))
  .catch((err) => {
    logger.error(err.message)
    process.exit()
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/person', personRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(errorHandler.logAndShowError(next, new Error('Not found'), 404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
