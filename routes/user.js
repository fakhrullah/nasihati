'use strict'
/*
 * Resource
 */

var express = require('express')
var router = express.Router()

// -------- middlewares -----
// router.use('/', (req, res, next) => {})

// ----- routes ---------

/**
 * List all resource
 *
 * GET /
 */
router.get('', (req, res) => {
  console.log('list all resources')

  res.status(404).send('None')
})

/**
 * Form to create resource
 *
 * GET /create
 */
router.get('/create', (req, res) => {
  console.log('show form to create resource')

  res.status(404).send('None')
})

/**
 * Create resource
 *
 * POST /
 */
router.post('/', function (req, res, next) {
  console.log('create new resource')

  // handle data then redirect to show/edit page
  next(404)
})

/**
 * Show resource
 *
 * GET /:id
 */
router.get('/:id', function (req, res) {
  console.log('show resource at id ' + id)

  var id = req.params['id']

  res.status(404).send('None')
})

/**
 * Form to edit resource
 *
 * GET /:id/edit
 */
router.get('/:id/edit', (req, res) => {
  console.log('form to edit resource')

  res.status(404).send('None')
})

/**
 * Update resource
 *
 * PUT /:id
 */
router.put('/:id', function (req, res, next) {
  console.log('update resource at id ' + id)

  var id = req.params['id']

  // handle data then redirect to show/edit page
  next(404)
})

/**
 * Delete resource
 *
 * DELETE /:id
 */
router.delete('/:id', function (req, res, next) {
  console.log('delete resource at id ' + id)

  var id = req.params['id']

  // handle data then redirect to show all resource
  next(404)
})

module.exports = router
