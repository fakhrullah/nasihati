let express = require('express')
let router = express.Router()

let mainController = require('./controllers/main.controller')
let nasihatController = require('./controllers/nasihat.controller')
let pageController = require('./controllers/page.controller')

module.exports = router

router.get('/', mainController.indexPage)

// Activities
// TODO: Please reconfirm the routing is working
router.get('/activity/index', nasihatController.indexAdvices)
router.get('/activity/new', nasihatController.newAdvices)
router.post('/activity/create', nasihatController.createAdvice)
router.get('/activity/show/:id', nasihatController.showAdvice)
router.get('/activity/:id/edit', nasihatController.editAdvice)
router.put('/activity/:id/update', nasihatController.updateAdvice)
router.delete('/activity/:id/delete', nasihatController.deleteAdvice)

// Resource
// TODO: Please reconfirm the routing is working
router.get('/nasihat/next/:id', pageController.nextResource)
router.get('/nasihat/prev/:id', pageController.prevResource)
router.get('/:id/edit', pageController.editResource)
router.put('/:id', pageController.updateResource)
router.get('/:id', pageController.showResource)
router.get('/:id/:slug', (req, res) => {
  res.redirect('/nasihat/' + parseInt(req.params.id))
})
