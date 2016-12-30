'use strict'
/**
 * Routes for nasihat (quotes) resources
 */

var express = require('express')
var router = express.Router()
var nasihatCol = require('../nasihat_col.js')
// var nasihatCollection = require('../db/nasihat_collection.js')
var request = require('request')

/**
 * GET /nasihat/:id
 */
router.get('/:id', (req, res, next) => {
  var id = parseInt(req.params.id)
  var apiUrl = 'http://localhost:3000' + '/api/v1/nasihat/' + id
  var firstId = 1
  var lastId = 183

  request.get(apiUrl, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
    }

    var nasihat = JSON.parse(body)

    // TODO : think better way. May be API should give next and prev link
    var isPrevAvailable = true
    if (id === firstId) isPrevAvailable = false

    var isNextAvailable = true
    if (id === lastId) isNextAvailable = false

    var nextLink = isNextAvailable ? '/nasihat/' + (id + 1) : undefined
    var prevLink = isPrevAvailable ? '/nasihat/' + (id - 1) : undefined

    // render page
    res.render('nasihat/index', {
      title: 'Nasihat',
      quoteId: id,
      quote: nasihat.text,
      source: nasihat.source,
      nextLink: nextLink,
      prevLink: prevLink
    })
  })
})
router.get('/:id/:slug', (req, res) => res.redirect('/nasihat/' + parseInt(req.params.id)))

/**
 * Get next nasihat
 */
router.get('/next/:id', function (req, res) {
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
router.get('/prev/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get prev nasihat for id ' + id)

  nasihatCol.getPrevNasihatForId(id, function (err, data) {
    if (err) throw err

    // if last element AND no more next

    console.log(data)
    res.json(data)
  })
})

module.exports = router
