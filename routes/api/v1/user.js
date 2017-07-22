'use strict'
/*
 * Users
 */

var express = require('express')
var router = express.Router()
var userColl = require('../../../db/user_collection.js')

var passport = require('passport')

let Log = require('../../../utils/logger')

// -------- middlewares -----
router.use('', passport.authenticate('http-header-token', {session: false}))

// ----- routes ---------

/**
 * List all resource
 *
 * GET /
 */
router.get('', (req, res) => {
  Log.d('list all resources')

  res.json({status: 'Not implement yet'})
})

/**
 * Create resource
 *
 * POST /
 */
router.post('/', function (req, res) {
  Log.d('create new resource')

  // handle data then redirect to show/edit page
  res.json({status: 'Not implement yet'})
})

/**
 * Show resource
 *
 * GET /:id
 */
router.get('/:id', function (req, res) {
  var id = parseInt(req.params.id)

  Log.d('show user at id ' + id)

  userColl.getUserById(id)
    .then(user => {
      Log.d(JSON.stringify(user))

      res.json({
        status: 'success',
        user: user
      })
    })
    .catch(err => Log.e(err))
})

/**
 * Update resource
 *
 * PUT /:id
 */
router.put('/:id', function (req, res) {
  var id = req.params['id']
  Log.d('update resource at id ' + id)

  // handle data then redirect to show/edit page

  res.json({status: 'Not implement yet'})
})

/**
 * Delete resource
 *
 * DELETE /:id
 */
router.delete('/:id', function (req, res) {
  var id = req.params['id']
  Log.d('delete resource at id ' + id)

  // handle data then redirect to show all resource

  res.json({status: 'Not implement yet'})
})

module.exports = router
