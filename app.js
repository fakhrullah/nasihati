var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var ApiV1 = '/api/v1'
var nasihatCol = require('./nasihat_col.js')

// TODO handle error on /api/v1 route
// TODO middleware authorization on POST, PUT, DELETE method

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

  nasihatCol.getNasihatById( parseInt(id), function (err, nasihat) {

    if(err) console.log('miaw');
    res.json(nasihat);
  });

});

app.put(ApiV1 + '/nasihat/:id', function (req, res) {

  var id = req.params['id']

  console.log('update nasihat at id ' + id)

  nasihatCol.updateNasihatById(parseInt(id), req.body, function(err, data){

    if(err) throw err;

    res.json(data);

  });

})

app.post(ApiV1 + '/nasihat/', function (req, res){

  console.log('create new nasihat')

  nasihatCol.createNasihat(req.body, function(err, data){

    if(err) throw err;

    res.json(data);

  });

})

app.delete(ApiV1 + '/nasihat/:id', function (req, res) {

  var id = req.params['id']

  console.log('delete nasihat at id ' + id)

  nasihatCol.deleteNasihat(id, function(err, data){

    if(err) throw err;
    res.json(data);

  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
