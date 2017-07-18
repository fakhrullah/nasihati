/* global module, console */
/* eslint no-console: 0 */

let Log = require('../../utils/logger')

module.exports = {
  indexAdvices: indexAdvices,
  newAdvices: newAdvices,
  createAdvice: createAdvice,
  showAdvice: showAdvice,
  editAdvice: editAdvice,
  updateAdvice: updateAdvice,
  deleteAdvice: deleteAdvice
}

// Route: /activity/show
function indexAdvices (req, res) {
  Log.i('list all resources')

  res.status(404).send('None')
}

// Route: /activity/new
function newAdvices (req, res) {
  'use strict'
  Log.i('show form to create resource')

  res.status(404).send('None')
}

// Route: /activity/create
function createAdvice (req, next) {
  'use strict'
  Log.i('create new resource')

  // handle data then redirect to show/edit page
  next(404)
}

// Route: /activity/show/:id
function showAdvice (req, res) {
  'use strict'
  let id = req.params['id']
  Log.i('show resource at id ' + id)

  res.status(404).send('None')
}

// Route: /activity/:id/edit
function editAdvice (req, res) {
  'use strict'
  Log.i('form to edit resource')

  res.status(404).send('None')
}

// Route: /activity/:id/update
function updateAdvice (req, next) {
  'use strict'

  let id = req.params['id']
  Log.i('update resource at id ' + id)

  // handle data then redirect to show/edit page
  next(404)
}

// Route: /activity/:id/delete
function deleteAdvice (req, next) {
  let id = req.params['id']
  Log.i('delete resource at id ' + id)

  // handle data then redirect to show all resource
  next(404)
}
