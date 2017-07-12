let express = require('express')
let router = express.Router()

let mainController = require('./controllers/main.controller')
let activityController = require('./controllers/activity.controller')
let resourceController = require('./controllers/resource.controller')

module.exports = router

router.get('/', mainController.indexPage)

// Activities
// TODO: Please reconfirm the routing is working
router.get('/activity/index', activityController.indexAdvices)
router.get('/activity/new', activityController.newAdvices)
router.post('/activity/create', activityController.createAdvice)
router.get('/activity/show/:id', activityController.showAdvice)
router.get('/activity/:id/edit', activityController.editAdvice)
router.put('/activity/:id/update', activityController.updateAdvice)
router.delete('/activity/:id/delete', activityController.deleteAdvice)

// Resource
// TODO: Please reconfirm the routing is working
router.get('/nasihat/next/:id', resourceController.nextResource)
router.get('/nasihat/prev/:id', resourceController.prevResource)
router.get('/:id/edit', resourceController.editResource)
router.put('/:id', resourceController.updateResource)
router.get('/:id', resourceController.showResource)
router.get('/:id/:slug', (req, res) => {
  res.redirect('/nasihat/' + parseInt(req.params.id))
})
