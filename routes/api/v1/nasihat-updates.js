/*
 * API v1 routes for nasihat updates revisions
 *
 */

var express = require('express')
var router = express.Router()
var nasihatCollection = require('../../../db/nasihat_collection.js')

var ObjectID = require('mongodb').ObjectID

router.get('/:nasihatId/updates/', (req, res, next) => {
  nasihatCollection.getNasihatById(parseInt(req.params.nasihatId))
    .then(nasihat => {
      res.json(nasihat.updates)
    })
    .catch(err => res.json(err))
})

// approve
router.get('/:nasihatId/updates/:id', (req, res, next) => {
  // var status = req.body.status
  var status = req.query.status
  if (status !== 'approve') {
    res.status(404).json({
      msg: 'status value as "' + status + '" not available!'
    })
    return
  }

  var nasihatId = parseInt(req.params.nasihatId)
  var nasihatUpdatesRevisionId = req.params.id

  // get updates data
  // then use the data update nasihat
  // then delete updates data
  // then response success
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
      if (updated.ok === 1 && updated.nModified === 1) {
        res.json({
          status: 'success',
          msg: 'Nasihat#nasihatId is updated.'
        })
      } else {
        throw new Error('Nasihat is not update.')
      }
    })
    .catch(err => res.json(err))
})

// delete

module.exports = router
