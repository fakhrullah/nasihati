/*
 * API v1 routes for nasihat (quote resources)
 */

var express = require('express')
var router = express.Router()
var nasihatCollection = require('../../../db/nasihat_collection.js')

var passport = require('passport')
var MongodbObjectID = require('mongodb').ObjectID

let Log = require('../../../utils/logger')

// -------- middlewares -----
//
// TODO add authetication admin for create (POST), edit with limitation (PUT), delete(DELETE)
// TODO restructure nasihat collection so that editting for non-admin just add new revision
// and admin job is approve revision to update
//

// ----- routes ---------
router.get('/:id', passport.authenticate('http-header-token', {session: false}))
router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params['id'])

  Log.d('API: show nasihat at id ' + id)

  nasihatCollection.getNasihatById(id)
    .then(nasihat => res.json(nasihat))
})

// TODO secure editing by save history and let admin approve before accepting user submitted edit
router.put('/:id', passport.authenticate('http-header-token', {session: false}))
router.put('/:id', function (req, res, next) {
  var id = parseInt(req.params['id'])

  Log.d('update nasihat at id ' + id)
  Log.d('with data: ' + JSON.stringify(req.body))

  // Only add update to revision
  var nasihatUpdate = {}
  nasihatUpdate._id = new MongodbObjectID()
  nasihatUpdate.text = req.body.text
  nasihatUpdate.source = req.body.source
  nasihatUpdate.createdAt = new Date()
  var updateData = {$push: {updates: nasihatUpdate}}

  // should use nasihatModel as middleware before the database
  nasihatCollection.updateNasihatById(id, updateData)
    .then(data => {
      Log.d('updated')
      // res.redirect('/api/v1/nasihat/' + id)
      res.json(data)
    })
    .catch(err => Log.e(err))
})

router.post('', passport.authenticate('http-header-token', {session: false}))
router.post('/', function (req, res) {
  Log.d('create new nasihat')

  // Log.d(req.body)
  nasihatCollection.createNasihat(req.body)
    .then(result => {
      Log.d(result.result)
      res.json(result)
    })
    .catch(err => Log.d(err))
})

router.delete('/:id', passport.authenticate('http-header-token', {session: false}))
router.delete('/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  Log.d('delete nasihat at id ' + id)

  nasihatCollection.deleteNasihat(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => Log.e(err))
})

// TODO remove next and prev
// Better way: redesign GET /:id API to send JSON contains id,url of next and prev

/**
 * Get next
 */
router.get('/:id/next', function (req, res) {
  var id = parseInt(req.params['id'])

  Log.d('get next nasihat for nasihat at id ' + id)

  nasihatCollection.getNextNasihatForId(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => Log.e(err))
})

/**
 * Get prev
 */
router.get('/:id/prev', function (req, res) {
  var id = parseInt(req.params['id'])

  Log.d('get previous nasihat for nasihat at id ' + id)

  nasihatCollection.getPrevNasihatForId(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => Log.e(err))
})

module.exports = router
