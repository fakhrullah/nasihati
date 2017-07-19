let request = require('request')
let svgCaptcha = require('svg-captcha')

let apiUrlNasihatResource = process.env.API_URL

let authorizationToken = {Authorization: 'Token ' + process.env.API_KEY}

// Init model
let Nasihat = require('../models/advices')
let Log = require('../../utils/logger')

module.exports = {
  nextResource: nextResource,
  prevResource: prevResource,
  editResource: editResource,
  updateResource: updateResource,
  showResource: showResource
}

function nextResource (req, res) {
  'use strict'
  let id = parseInt(req.params['id'])
  // Nasihat.findNextResource(id, (data) => { res.json(data[0]) })
  Nasihat.findNextResource(id).then((data) => { res.json(data[0]) })
}

function prevResource (req, res) {
  'use strict'
  let id = parseInt(req.params['id'])
  Nasihat.findPrevResource(id).then((data) => { res.json(data[0]) })
}

function editResource (req, res, next) {
  'use strict'
  let id = parseInt(req.params.id)
  Log.i(`show edit form for nasihat on id ${id}`)
  // TODO use config.baseUrl
  let apiUrl = `${apiUrlNasihatResource}${id}`

  let options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      Log.e(err)
      next(err)
      return
    }

    let flashError = req.session.flash || undefined
    Log.d('flashError: ' + flashError)
    req.session.flash = undefined

    let nasihat = JSON.parse(body)
    let chars = svgCaptcha.create()
    req.session.captcha = chars.text

    res.render('nasihat/edit', {
      title: `Sunting Nasihat [#${id}]`,
      updateUrl: `/nasihat/${id}`,
      nasihat: nasihat,
      captcha: chars.data,
      error: flashError
    })
  })
}

function updateResource (req, res, next) {
  'use strict'
  let id = parseInt(req.params.id)
  Log.i('update nasihat at id ' + id)
  let dataSubmitByUser = req.body
  Log.d('data submit by user -------')
  Log.d(dataSubmitByUser)
  Log.d('----------')

  let apiUrl = `${apiUrlNasihatResource}${id}`

  // validate captcha
  Log.d('req.body.captcha : ' + req.body.captcha)
  Log.d('req.session.captcha : ' + req.session.captcha)

  if (req.body.captcha !== req.session.captcha) {
    let err = Error('Captcha not valid')
    Log.e(err)
    req.session.flash = 'Captcha not valid'
    res.redirect('/nasihat/' + id + '/edit')
    return
  }

  delete (req.body.captcha)
  let options = {url: apiUrl, headers: authorizationToken, form: req.body}

  request.put(options, (err, response, body) => {
    if (err) {
      Log.e(err)
      return next(err)
    }

    res.redirect('/nasihat/' + id + '/edit')
  })
}

function showResource (req, res, next) {
  'use strict'
  let id = parseInt(req.params.id)
  Log.i(`show nasihat at id ${id}`)
  // TODO use config.baseUrl
  let apiUrl = `${apiUrlNasihatResource}${id}`
  // TODO get lastId from DB
  // better to let API handle this by sending next url link
  let firstId = 1
  let lastId = 183

  let options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      Log.e(err)
      next(err)
      return
    }
    Log.d(body)
    let nasihat = JSON.parse(body)

    // TODO : think better way. May be API should give next and prev link
    let isPrevAvailable = true
    if (id === firstId) isPrevAvailable = false

    let isNextAvailable = true
    if (id === lastId) isNextAvailable = false

    let nextLink = isNextAvailable ? '/nasihat/' + (id + 1) : undefined
    let prevLink = isPrevAvailable ? '/nasihat/' + (id - 1) : undefined

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
}
