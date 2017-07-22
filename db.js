var mongoose = require('mongoose')
let Log = require('./utils/logger')

mongoose.connect('mongodb://localhost/nasihat',
    function () {
      Log.d('mongodb connected')
    })
switch (process.env.NODE_ENV) {
  case 'test':
    mongoose.connect('mongodb://localhost/nasihat-test',
      function () {
        Log.d('mongodb connected')
      })
    break
  case 'production':
    mongoose.connect('mongodb://localhost/nasihat',
      function () {
        Log.d('mongodb connected')
      })
    break
}
module.exports = mongoose
