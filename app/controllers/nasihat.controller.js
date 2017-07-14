/* global module, console */
/* eslint no-console: 0 */

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
function indexAdvices (res) {
  console.log('list all resources')

  res.status(404).send('None')
}

// Route: /activity/new
function newAdvices (res) {
  'use strict'
  console.log('show form to create resource')

  res.status(404).send('None')
}

// Route: /activity/create
function createAdvice (next) {
  'use strict'
  console.log('create new resource')

  // handle data then redirect to show/edit page
  next(404)
}

// Route: /activity/show/:id
function showAdvice (req, res) {
  'use strict'
  let id = req.params['id']
  console.log('show resource at id ' + id)

  res.status(404).send('None')
}

// Route: /activity/:id/edit
function editAdvice (res) {
  'use strict'
  console.log('form to edit resource')

  res.status(404).send('None')
}

// Route: /activity/:id/update
function updateAdvice (req, next) {
  'use strict'

  let id = req.params['id']
  console.log('update resource at id ' + id)

  // handle data then redirect to show/edit page
  next(404)
}

// Route: /activity/:id/delete
function deleteAdvice (req, next) {
  let id = req.params['id']
  console.log('delete resource at id ' + id)

  // handle data then redirect to show all resource
  next(404)
}
