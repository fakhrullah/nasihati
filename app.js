var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
// var _ = require('lodash')
var moment = require('moment')
var ApiV1 = '/api/v1'
var nasihatCol = require('./nasihat_col.js')
var config = require('./config.js')

// TODO handle error on /api/v1 route
// TODO middleware authorization on POST, PUT, DELETE method

/*
 * use body parser to get data from request
 * use cookie-parser to set and get cookie
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))

/*
 * set view engine
 */
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

// Routes
app.use('/', require('./routes/index'))

/**
 * Block all api until authentication/authorization added only on production
 * TODO add auth guna passportjs then delete this preventation
 */
app.use(ApiV1, function (req, res, next) {
  if (config.env === 'production') {
    console.log('Block temporary for production only. If you are on development, change config.js -> env: "development".')
    res.status(403)
    res.send('403 Forbidden')
  }
  next()
})

/*
 * API routes
 */
app.get(ApiV1 + '/nasihat/:id', function (req, res) {
  var id = req.params['id']

  console.log('show nasihat at id ' + id)

  nasihatCol.getNasihatById(parseInt(id), function (err, nasihat) {
    if (err) console.log('miaw')
    res.json(nasihat)
  })
})

app.put(ApiV1 + '/nasihat/:id', function (req, res) {
  var id = req.params['id']

  console.log('update nasihat at id ' + id)

  nasihatCol.updateNasihatById(parseInt(id), req.body, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

app.post(ApiV1 + '/nasihat/', function (req, res) {
  console.log('create new nasihat')

  nasihatCol.createNasihat(req.body, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

app.delete(ApiV1 + '/nasihat/:id', function (req, res) {
  var id = req.params['id']

  console.log('delete nasihat at id ' + id)

  nasihatCol.deleteNasihat(id, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

/**
 * Get next nasihat
 */
app.get('/nasihat/next/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get next nasihat for id ' + id)

  nasihatCol.getNextNasihatForId(id, function (err, data) {
    if (err) throw err

    // TODO: fix if last element AND no more next

    console.log(data)
    res.json(data)
  })
})

/**
 * Get prev nasihat
 */
app.get('/nasihat/prev/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get prev nasihat for id ' + id)

  nasihatCol.getPrevNasihatForId(id, function (err, data) {
    if (err) throw err

    // if last element AND no more next

    console.log(data)
    res.json(data)
  })
})

// development error handler
// will print stacktrace
// should use config file
if (config.env === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

app.listen(config.port, function () {
  console.log('Example app listening on port ' + config.port + '!')
})
