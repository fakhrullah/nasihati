/**
 * Routes for nasihat (quotes) resources
 */

var express = require('express')
var router = express.Router()
var nasihatCol = require('../nasihat_col.js')

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
