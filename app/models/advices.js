let db = require('../../db')
let Schema = db.Schema

var nasihatSchema = new Schema(
  {
    id: Number,
    text: String,
    source: String,
    source_link: String,
    show_at: { type: Date, default: Date.now }
  },
  { timestamps: { createdAt: 'created_at' }
  })

nasihatSchema.statics.findNextResource = function (err, currentId, callback) {
  'use strict'
  if (err) {
    return callback(err)
  }
  return this.find({id: {$gt: currentId}}, callback)
    .limit(1)
}

nasihatSchema.statics.findPrevResource = function (err, currentId, callback) {
  'use strict'
  if (err) {
    return callback(err)
  }
  return this.find({id: {$lt: currentId}}, callback)
    .sort({id: -1})
    .limit(1)
}

let Nasihat = db.model('nasihats', nasihatSchema)

module.exports = Nasihat
