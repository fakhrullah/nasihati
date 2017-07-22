/**
 * Application Requirement
 * @type {*}
 */
/* global require, __dirname, console */
/* eslint no-console: 0 */
/* global describe, it, require, should  */
/* eslint handle-callback-err: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
require('dotenv').config()

let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
let MongoStore = require('connect-mongo')(session)
let methodOverride = require('method-override')
let path = require('path')
//  _ = require('lodash'),

/**
/**
 * HTTP Logic handler
 */
let userCollection = require('./db/user_collection.js')
let passport = require('passport')
let HttpHeaderTokenStrategy = require('passport-http-header-token').Strategy
let LocalStrategy = require('passport-local').Strategy

// TODO handle error on /api/v1 route
// TODO middleware authorization on POST, PUT, DELETE method

passport.use(new HttpHeaderTokenStrategy({},
  (apikey, cb) => {
    userCollection.getUserByApiKey(apikey)
      .then(user => {
        if (apikey === user.apikey) {
          console.log('apikey valid')
          return cb(null, user)
        } else {
          console.log('apikey not valid')
          throw new Error('Api Key not valid!')
        }
      })
      .catch(err => cb(err))
  }))

passport.use(new LocalStrategy((username, password, cb) => {
  userCollection.getUserByUsername(username)
    .then(user => {
      if (!user) throw new Error('User not found. Please insert correct username.')
      if (password !== user.password) throw new Error('Password is wrong')
      cb(null, user)
    })
    .catch(err => cb(err))
}))

passport.serializeUser((user, cb) => cb(null, user._id))
passport.deserializeUser((userId, cb) => {
  userCollection.getUserById(userId)
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

/**
 * use body parser to get data from request
 * use cookie-parser to set and get cookie
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// TODO add secret for session and cookie, use same secret from config
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost:27017/nasihat'
  }),
  resave: true,
  saveUninitialized: true,
  secret: 'secret'
}))
app.use(cookieParser('secret'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(passport.initialize())
app.use(passport.session())

/**
 * set view engine
 */
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

/**
 * Requiring the routes
 */
app.use(require('./app/routes'))

app.listen(3000, function () {
  console.log('Example app listening on port ' + 3000 + '!')
})

module.exports = app
