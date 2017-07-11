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

let Nasihat = db.model('nasihats', nasihatSchema)

module.exports = Nasihat
