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
  var apiUrl = 'http://localhost:3000' + '/api/v1/nasihat/' + req.params.id

  request.get(apiUrl, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
    }
    res.json(JSON.parse(body))
  })
  // nasihatCollection.getNasihatById(id)
  //   .then(result => {
  //     // res.render('nasihat/index')
  //     res.json(result)
  //   })
  //   .catch(err => console.log(err))
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
