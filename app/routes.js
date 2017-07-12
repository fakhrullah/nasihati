let express = require('express')
let router = express.Router()
let mainController = require('./controllers/main.controller')

module.exports = router

router.get('/', mainController.indexPage)
