var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nasihat',
    function () {
        console.log('mongodb connected')

    })

module.exports = mongoose