var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
// var _ = require('lodash')
var moment = require('moment')
var ApiV1 = '/api/v1'
var nasihatCol = require('./nasihat_col.js')

// TODO handle error on /api/v1 route
// TODO middleware authorization on POST, PUT, DELETE method

/*
 * use body parser to get data from request
 * use cookie-parser to set and get cookie
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

/*
 * set view engine
 */
app.set('view engine', 'pug')

/**
 * Homepage route
 * Show a quote for today with next and previous link
 * Today quote is determined by data in cookie/localstorage
 */
app.get('/', function (req, res) {
  console.log('show a quote for today')

  var todayId
  var todayDate = moment().format('YYYY-MM-DD')
  console.log(todayDate)

  // Show next quote compare to yesterday
  var lastQuoteId = req.cookies.lastQuoteId
  var lastDayQuote = req.cookies.lastDayQuote // date when last quote shown

  if (!lastQuoteId) {
    // For first time user or first time device
    console.log('1st time user')

    todayId = 1
    res.cookie('lastQuoteId', 1)
    res.cookie('lastDayQuote', todayDate)
  } else {
    // Repeated user
    console.log('Repeated user')

    if (moment(lastDayQuote).isSame(todayDate)) {
      // Repeated user on same day get same quote as last shown
      todayId = parseInt(lastQuoteId)
      console.log('Repeated user same day')
    } else {
      // Repeated user different day get to see next quote compared to last shown
      todayId = parseInt(lastQuoteId) + 1

      res.cookie('lastQuoteId', todayId)
      res.cookie('lastDayQuote', todayDate)

      console.log('Repeated user different day')
    }
  }

  console.log('today quote id = ' + todayId)

  // get quote from database
  nasihatCol.getNasihatById(todayId, function (err, nasihat) {
    // TODO if err to next error page
    if (err) console.log('ERROR: ' + err.message)

    // render page
    res.render('homepage', {
      title: 'Nasihat',
      quoteId: todayId,
      quote: nasihat.text,
      source: nasihat.source
    })
  })
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
 * get next nasihat
 */
app.get('/nasihat/next/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get next nasihat for id ' + id)

  nasihatCol.getNextNasihatForId(id, function (err, data) {
    if (err) throw err

    console.log(data)
    res.json(data)
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
