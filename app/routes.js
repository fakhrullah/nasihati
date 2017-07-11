let express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller')

module.exports = router;

router.get('/', mainController.indexPage)

