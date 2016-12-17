/*
 * API v1 routes for nasihat (quote resources)
 */

var express = require('express')
var router = express.Router()
var nasihatCol = require('../../../nasihat_col.js')
var config = require('../../../config.js')

// -------- middlewares -----

/**
 * Block all api until authentication/authorization added only on production
 * TODO add auth guna passportjs then delete this preventation
 */
router.use('/', function (req, res, next) {
  if (config.env === 'production') {
    console.log('Block temporary for production only. If you are on development, change config.js -> env: "development".')
    res.status(403)
    res.send('403 Forbidden')
  }
  next()
})

// ----- routes ---------
router.get('/:id', function (req, res) {
  var id = req.params['id']

  console.log('show nasihat at id ' + id)

  nasihatCol.getNasihatById(parseInt(id), function (err, nasihat) {
    if (err) console.log('miaw')
    res.json(nasihat)
  })
})

router.put('/:id', function (req, res) {
  var id = req.params['id']

  console.log('update nasihat at id ' + id)

  nasihatCol.updateNasihatById(parseInt(id), req.body, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

router.post('/', function (req, res) {
  console.log('create new nasihat')

  nasihatCol.createNasihat(req.body, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

router.delete('/:id', function (req, res) {
  var id = req.params['id']

  console.log('delete nasihat at id ' + id)

  nasihatCol.deleteNasihat(id, function (err, data) {
    if (err) throw err

    res.json(data)
  })
})

module.exports = router
