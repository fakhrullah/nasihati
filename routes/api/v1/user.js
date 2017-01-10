'use strict'
/*
 * Users
 */

var express = require('express')
var router = express.Router()
var userColl = require('../../../db/user_collection.js')

var passport = require('passport')

// -------- middlewares -----
router.use('', passport.authenticate('http-header-token', {session: false}))

// ----- routes ---------

/**
 * List all resource
 *
 * GET /
 */
router.get('', (req, res) => {
  console.log('list all resources')

  res.json({status: 'Not implement yet'})
})

/**
 * Create resource
 *
 * POST /
 */
router.post('/', function (req, res) {
  console.log('create new resource')

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

  console.log('show user at id ' + id)

  userColl.getUserById(id)
    .then(user => {
      console.log(JSON.stringify(user))

      res.json({
        status: 'success',
        user: user
      })
    })
    .catch(err => console.log(err))
})

/**
 * Update resource
 *
 * PUT /:id
 */
router.put('/:id', function (req, res) {
  console.log('update resource at id ' + id)

  var id = req.params['id']

  // handle data then redirect to show/edit page

  res.json({status: 'Not implement yet'})
})

/**
 * Delete resource
 *
 * DELETE /:id
 */
router.delete('/:id', function (req, res) {
  console.log('delete resource at id ' + id)

  var id = req.params['id']

  // handle data then redirect to show all resource

  res.json({status: 'Not implement yet'})
})

module.exports = router
