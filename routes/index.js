/**
 * Route for root / homepage
 */

var express = require('express')
var router = express.Router()
var nasihatCol = require('../nasihat_col.js')
var moment = require('moment')

let Log = require('../utils/logger')

/**
 * Homepage route
 * Show a quote for today with next and previous link
 * Today quote is determined by data in cookie/localstorage
 */
router.get('/', function (req, res) {
  Log.d('show a quote for today')

  var todayId
  var todayDate = moment().format('YYYY-MM-DD')
  Log.d(todayDate)

  // Show next quote compare to yesterday
  var lastQuoteId = req.cookies.lastQuoteId
  var lastDayQuote = req.cookies.lastDayQuote // date when last quote shown

  if (!lastQuoteId) {
    // For first time user or first time device
    Log.d('1st time user')

    todayId = 1
    res.cookie('lastQuoteId', 1)
    res.cookie('lastDayQuote', todayDate)
  } else {
    // Repeated user
    Log.d('Repeated user')

    if (moment(lastDayQuote).isSame(todayDate)) {
      // Repeated user on same day get same quote as last shown
      todayId = parseInt(lastQuoteId)
      Log.d('Repeated user same day')
    } else {
      // Repeated user different day get to see next quote compared to last shown
      todayId = parseInt(lastQuoteId) + 1

      res.cookie('lastQuoteId', todayId)
      res.cookie('lastDayQuote', todayDate)

      Log.d('Repeated user different day')
    }
  }

  Log.d('today quote id = ' + todayId)

  // get quote from database
  nasihatCol.getNasihatById(todayId, function (err, nasihat) {
    // TODO if err to next error page
    if (err) Log.e('ERROR: ' + err.message)

    // render page
    res.render('homepage', {
      title: 'Nasihat',
      quoteId: todayId,
      quote: nasihat.text,
      source: nasihat.source
    })
  })
})

module.exports = router
