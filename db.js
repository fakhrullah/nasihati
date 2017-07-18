var mongoose = require('mongoose')
let Log = require('./utils/logger')

mongoose.connect('mongodb://localhost/nasihat',
    function () {
      Log.d('mongodb connected')
    })

module.exports = mongoose
