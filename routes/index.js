/**
 * Route for root / homepage
 */

var express = require('express')
var router = express.Router()
var nasihatCol = require('../nasihat_col.js')
var moment = require('moment')

/**
 * Homepage route
 * Show a quote for today with next and previous link
 * Today quote is determined by data in cookie/localstorage
 */
router.get('/', function (req, res) {
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

module.exports = router
