'use strict'
/**
 * Routes for nasihat (quotes) resources
 */

var express = require('express')
var router = express.Router()
var nasihatCollection = require('../db/nasihat_collection.js')
var request = require('request')
var svgCaptcha = require('svg-captcha')
var config = require('../config.js')

var baseUrl = config.env === 'development' ? 'http://localhost:3000' : 'https://nasihat.fajarhac.com'
var apiUrlNasihatResource = baseUrl + '/api/v1/nasihat/'

var authorizationToken = {Authorization: 'Token ' + config.apikey}

/**
 * Get next nasihat
 */
router.get('/next/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get next nasihat for id ' + id)

  nasihatCollection.getNextNasihatForId(id, {db: req.app.locals.db })
  .then(data => {
    console.log(data)
    res.json(data)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
})

/**
 * Get prev nasihat
 */
router.get('/prev/:id', function (req, res) {
  var id = parseInt(req.params['id'])

  console.log('get prev nasihat for id ' + id)

  nasihatCollection.getPrevNasihatForId(id, {db: req.app.locals.db })
  .then(data => {
    console.log(data)
    res.json(data)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
})

/**
 * GET /nasihat/:id/edit
 */
router.get('/:id/edit', (req, res, next) => {
  var id = parseInt(req.params.id)
  console.log(`show edit form for nasihat on id ${id}`)
  // TODO use config.baseUrl
  var apiUrl = `${apiUrlNasihatResource}${id}`

  var options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
      return
    }

    var flashError = req.session.flash || undefined
    console.log('flashError: ' + flashError)
    req.session.flash = undefined

    var nasihat = JSON.parse(body)
    var chars = svgCaptcha.create()
    req.session.captcha = chars.text

    res.render('nasihat/edit', {
      title: `Sunting Nasihat [#${id}]`,
      updateUrl: `/nasihat/${id}`,
      nasihat: nasihat,
      captcha: chars.data,
      error: flashError
    })
  })
})

/**
 * PUT nasihat/:id
 *
 * Update nasihat (quote)
 */
router.put('/:id', (req, res, next) => {
  var id = parseInt(req.params.id)
  console.log('update nasihat at id ' + id)
  var dataSubmitByUser = req.body
  console.log('data submit by user -------')
  console.log(dataSubmitByUser)
  console.log('----------')

  var apiUrl = `${apiUrlNasihatResource}${id}`

  // validate captcha
  console.log('req.body.captcha : ' + req.body.captcha)
  console.log('req.session.captcha : ' + req.session.captcha)

  if (req.body.captcha !== req.session.captcha) {
    var err = Error('Captcha not valid')
    console.log(err)
    req.session.flash = 'Captcha not valid'
    res.redirect('/nasihat/' + id + '/edit')
    return
  }

  delete (req.body.captcha)
  var options = {url: apiUrl, headers: authorizationToken, form: req.body}

  request.put(options, (err, response, body) => {
    if (err) {
      console.log(err)
      return next(err)
    }

    res.redirect('/nasihat/' + id + '/edit')
  })
})

/**
 * GET /nasihat/:id
 */
router.get('/:id', (req, res, next) => {
  var id = parseInt(req.params.id)
  console.log(`show nasihat at id ${id}`)
  // TODO use config.baseUrl
  var apiUrl = `${apiUrlNasihatResource}${id}`
  // TODO get lastId from DB
  // better to let API handle this by sending next url link
  var firstId = 1
  var lastId = 183

  var options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
      return
    }
    console.log(body)
    var nasihat = JSON.parse(body)

    // TODO : think better way. May be API should give next and prev link
    var isPrevAvailable = true
    if (id === firstId) isPrevAvailable = false

    var isNextAvailable = true
    if (id === lastId) isNextAvailable = false

    var nextLink = isNextAvailable ? '/nasihat/' + (id + 1) : undefined
    var prevLink = isPrevAvailable ? '/nasihat/' + (id - 1) : undefined

    // render page
    res.render('nasihat/index', {
      title: 'Nasihat',
      quoteId: id,
      quote: nasihat.text,
      source: nasihat.source,
      nextLink: nextLink,
      prevLink: prevLink
    })
  })
})
router.get('/:id/:slug', (req, res) => res.redirect('/nasihat/' + parseInt(req.params.id)))

module.exports = router
