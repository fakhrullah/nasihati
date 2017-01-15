/*
 * API v1 routes for nasihat updates revisions
 *
 */

var express = require('express')
var router = express.Router()
var nasihatCollection = require('../../../db/nasihat_collection.js')

var passport = require('passport')

var ObjectID = require('mongodb').ObjectID

router.use('/:nasihatId/updates', (req, res, next) => {
  passport.authenticate('http-header-token', (err, user, info) => {
    if (err) {
      console.log(err)
      res.json({status: 'API token not valid', msg: err.message})
      return
    }
    if (!user) {
      console.log(user)
      res.json({status: 'failed', msg: 'API token not found'})
      return
    }
    next()
  })(req, res, next)
})

router.get('/:nasihatId/updates', (req, res, next) => {
  console.log('GET nasihat#' + req.params.nasihatId + ' revisions')

  nasihatCollection.getNasihatById(parseInt(req.params.nasihatId))
    .then(nasihat => {
      if (!nasihat.updates || nasihat.updates.length === 0) {
        throw new Error('No revisions available')
      }
      res.json(nasihat.updates)
    })
    .catch(err => res.json({status: 'failed', msg: err.message}))
})

// approve
router.put('/:nasihatId/updates/:id', passport.authenticate('local', {session: true}))
router.put('/:nasihatId/updates/:id', (req, res, next) => {
  console.log('API update nasihat with revision ' + req.params.id)

  var status = req.body.status
  console.log(status)

  if (status !== 'approve') {
    res.status(404).json({
      msg: 'status value as "' + status + '" not available!'
    })
    return
  }

  var nasihatId = parseInt(req.params.nasihatId)
  var nasihatUpdatesRevisionId = req.params.id

  // update only give the revision id,
  // so get the data from revision that going to be use
  // replace main data with the chosed revision
  // then tell user if it succeed
  nasihatCollection.getNasihatById(nasihatId)
    .then(nasihat => {
      var newNasihat = nasihat.updates.find((revision) => {
        return revision._id.equals(new ObjectID(nasihatUpdatesRevisionId))
      })
      var updateData = {
        $set: {text: newNasihat.text, source: newNasihat.source},
        $pull: {updates: {_id: new ObjectID(nasihatUpdatesRevisionId)}}
      }
      return nasihatCollection.updateNasihatById(nasihat.id, updateData)
    })
    .then(updated => {
      if (updated.result.ok === 1 && updated.result.nModified === 1) {
        res.json({
          status: 'success',
          msg: 'Nasihat#' + nasihatId + ' is updated.'
        })
        console.log('success updated')
      } else {
        var error = new Error('Nasihat is not update.')
        error.result = updated
        throw error
      }
    })
    .catch(err => res.json({status: 'failed', msg: err.message, result: err.result}))
})

/**
 * DELETE
 * Delete nasihat updates revision. Used when user submitted updates is bad and should not be approve.
 */
router.delete('/:nasihatId/updates/:id', passport.authenticate('local', {session: true}))
router.delete('/:nasihatId/updates/:id', (req, res, next) => {
  var nasihatId = parseInt(req.params.nasihatId)
  var nasihatUpdatesRevisionId = req.params.id
  console.log('nasihat#' + nasihatId + ' to revision ' + nasihatUpdatesRevisionId)

  var queryToDeleteRevision = {
    $pull: {updates: {_id: new ObjectID(nasihatUpdatesRevisionId)}}
  }

  nasihatCollection.updateNasihatById(nasihatId, queryToDeleteRevision)
    .then(result => {
      // console.log(result)

      if (result.result.ok === 1 && result.result.nModified === 1) {
        res.json({
          status: 'success',
          msg: 'Nasihat#' + nasihatId + ' is updated.',
          result: result
        })

        console.log('success updated')
      } else {
        var error = new Error('Nasihat is not update.')
        error.result = result
        throw error
      }
    })
    .catch(err => res.json({status: 'failed', msg: err.message, result: err.result}))
})

module.exports = router
