let request = require('request')
let svgCaptcha = require('svg-captcha')
let config = require('../../config.js')

let baseUrl = config.env === 'development' ? 'http://localhost:3000' : 'https://nasihat.fajarhac.com'
let apiUrlNasihatResource = baseUrl + '/api/v1/nasihat/'

let authorizationToken = {Authorization: 'Token ' + config.apikey}

// Init model
let Nasihat = require('../models/advices')

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
  console.log(`show edit form for nasihat on id ${id}`)
  // TODO use config.baseUrl
  let apiUrl = `${apiUrlNasihatResource}${id}`

  let options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
      return
    }

    let flashError = req.session.flash || undefined
    console.log('flashError: ' + flashError)
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
  console.log('update nasihat at id ' + id)
  let dataSubmitByUser = req.body
  console.log('data submit by user -------')
  console.log(dataSubmitByUser)
  console.log('----------')

  let apiUrl = `${apiUrlNasihatResource}${id}`

  // validate captcha
  console.log('req.body.captcha : ' + req.body.captcha)
  console.log('req.session.captcha : ' + req.session.captcha)

  if (req.body.captcha !== req.session.captcha) {
    let err = Error('Captcha not valid')
    console.log(err)
    req.session.flash = 'Captcha not valid'
    res.redirect('/nasihat/' + id + '/edit')
    return
  }

  delete (req.body.captcha)
  let options = {url: apiUrl, headers: authorizationToken, form: req.body}

  request.put(options, (err, response, body) => {
    if (err) {
      console.log(err)
      return next(err)
    }

    res.redirect('/nasihat/' + id + '/edit')
  })
}

function showResource (req, res, next) {
  'use strict'
  let id = parseInt(req.params.id)
  console.log(`show nasihat at id ${id}`)
  // TODO use config.baseUrl
  let apiUrl = `${apiUrlNasihatResource}${id}`
  // TODO get lastId from DB
  // better to let API handle this by sending next url link
  let firstId = 1
  let lastId = 183

  let options = {url: apiUrl, headers: authorizationToken}

  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err)
      next(err)
      return
    }
    console.log(body)
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
