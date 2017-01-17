'use strict'
/*
 * Resource
 */

var express = require('express')
var router = express.Router()
var request = require('request')
var config = require('../config.js')

var baseUrl = config.env === 'development' ? 'http://localhost:' + config.port : 'https://nasihat.fajarhac.com'
var apiUrlNasihatResource = `${baseUrl}/api/v1/nasihat`
var authorizationToken = {Authorization: 'Token ' + config.apikey}

// -------- middlewares -----
// router.use('/', (req, res, next) => {})

// admin auth
// + login
// + logout

// ----- routes ---------

/**
 * List all resource
 *
 * GET /
 */
router.get('/:nasihatId/revisions', (req, res) => {
  var nasihatId = parseInt(req.params.nasihatId)

  console.log('list all nasihat#' + nasihatId + ' revisions')

  var apiUrl = `${apiUrlNasihatResource}/${nasihatId}/updates`
  var options = {url: apiUrl, headers: authorizationToken}

  request.get(options,
    (err, httpRes, body) => {
      if (err) {
        console.log(err)
        req.session.flash = err.message
        res.redirect(nasihatId + '/edit')
        return
      }

      res.json(JSON.parse(body))
    })
})

/**
 * Update nasihat with revision
 *
 * PUT /:nasihatId/revisions/:id
 */
router.put('/:nasihatId/revisions/:id', function (req, res) {
  var nasihatId = parseInt(req.params.nasihatId)
  var revisionId = req.params.id
  console.log('update nasihat#' + nasihatId + ' revision#[ ' + revisionId + ' ]')

  var apiUrl = `${apiUrlNasihatResource}/${nasihatId}/updates/${revisionId}`
  console.log(apiUrl)
  var options = {url: apiUrl, headers: authorizationToken, form: req.body}

  request.put(options,
    (err, httpRes, body) => {
      var resBody
      try {
        resBody = JSON.parse(body)
      } catch (e) {
        resBody = {error: e.message, body: body}
        res.status(404).json(resBody)
        return
      }

      if (err) {
        console.log(err)
        req.session.flash = err.message
        // res.redirect(nasihatId + '/edit')
        resBody.error = err.message
        res.status(404).json(resBody)
        return
      }

      // res.redirect(nasihatId + '/edit')
      res.json(JSON.parse(body))
    })
})

/**
 * Delete resource
 *
 * DELETE /:id
 */
router.delete('/:nasihatId/revisions/:id', function (req, res) {
  var nasihatId = req.params.nasihatId
  var revisionId = req.params.id

  console.log('delete nasihat#' + nasihatId + ' revision#' + revisionId)

  var apiUrl = `${apiUrlNasihatResource}/${nasihatId}/updates/${revisionId}`
  var options = {url: apiUrl, headers: authorizationToken, form: req.body}

  request.delete(options, (err, httpRes, body) => {
    if (err) {
      res.status(404).send(body)
      return
    }
    if (httpRes.statusCode !== 200) {
      console.log(httpRes.statusCode)
      res.status(httpRes.statusCode).send(body)
      return
    }
    res.send(body)
  })
})

module.exports = router
