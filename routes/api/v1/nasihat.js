/*
 * API v1 routes for nasihat (quote resources)
 */

var express = require('express')
var router = express.Router()
var nasihatCollection = require('../../../db/nasihat_collection.js')
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
  var id = parseInt(req.params['id'])

  console.log('show nasihat at id ' + id)

  nasihatCollection.getNasihatById(id)
    .then(nasihat => res.json(nasihat))
})

router.put('/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('update nasihat at id ' + id)

  nasihatCollection.updateNasihatById(id, req.body)
    .then(data => {
      console.log(data)
      res.redirect('/api/v1/nasihat/' + id)
    })
})

router.post('/', function (req, res) {
  console.log('create new nasihat')

  // console.log(req.body)
  nasihatCollection.createNasihat(req.body)
    .then(result => {
      console.log(result.result)
      res.redirect('/')
      // res.redirect('/api/v1/nasihat/')
    })
    .catch(err => console.log(err))
})

router.delete('/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('delete nasihat at id ' + id)

  nasihatCollection.deleteNasihat(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
})

/**
 * Get next
 */
router.get('/:id/next', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get next nasihat for nasihat at id ' + id)

  nasihatCollection.getNextNasihatForId(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
})

/**
 * Get prev
 */
router.get('/:id/prev', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get previous nasihat for nasihat at id ' + id)

  nasihatCollection.getPrevNasihatForId(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
})

module.exports = router
