var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var ApiV1 = '/api/v1'

/*
 * use body parser to get data from request
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
 * API routes
 */
app.get(ApiV1 + '/nasihat/:id', function (req, res) {

  var id = req.params['id']

  console.log('show nasihat at id ' + id)

  res.json({
    id: id,
    name: 'miaw'
  })

})

app.put(ApiV1 + '/nasihat/:id', function (req, res) {

  var id = req.params['id']
  var name = req.body['name']

  console.log('update nasihat at id ' + id)

  res.json({
    id: id,
    name: name
  })

})

app.post(ApiV1 + '/nasihat/', function (req, res){

  console.log('create new nasihat')

  res.json({
    id: 1
  })

})

app.delete(ApiV1 + '/nasihat/:id', function (req, res) {

  var id = req.params['id']

  console.log('delete nasihat at id ' + id)

  res.json({
    id: id
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
