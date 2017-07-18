let moment = require('moment')

let Nasihat = require('../models/advices')

let Log = require('../../utils/logger')

/**
 * Declaring accessible function for use.
 * @type {{printData: printData, saveData: saveData}}
 */
module.exports = {
  indexPage: indexPage
}

/**
 * Print out the data for posts
 * @param req
 * @param res
 * @param next
 */
function indexPage (req, res, next) {
  Log.d('Status: Showing a quote for today')

  let todayId
  let todayDate = moment().format('YYYY-MM-DD')
  Log.d(todayDate)

  // Show next quote compare to yesterday
  let lastQuoteId = req.cookies.lastQuoteId
  let lastDayQuote = req.cookies.lastDayQuote // date when last quote shown

  if (!lastQuoteId) {
    performFirstSessionSetup(res, todayDate)
  } else {
    todayId = performRepeatedUserTask(res, lastDayQuote, todayDate, lastQuoteId)
  }

  Nasihat.find({id: todayId})
    .exec(function (err, data) {
      if (err) { return next(err) }
      res.render('homepage', {
        title: 'Nasihat',
        quoteId: todayId,
        nasihat: data
      })
    })
}
/**
 * Locking the user as a first time user
 */
function performFirstSessionSetup (res, todayDate) {
  // For first time user or first time device
  Log.d('1st time user')
  let todayId
  todayId = 1
  res.cookie('lastQuoteId', 1)
  res.cookie('lastDayQuote', todayDate)

  return todayId
}

function performRepeatedUserTask (res, lastDayQuote, todayDate, lastQuoteId) {
  // Repeated user
  Log.d('Repeated user')

  let todayId
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

  return todayId
}
