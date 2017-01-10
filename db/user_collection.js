var MongoClient = require('mongodb').MongoClient
// var ObjectId = require('mongodb').ObjectId

// Connection URL
var url = 'mongodb://localhost:27017/nasihat'
var collectionName = 'user'

// Read data
module.exports = {

  /**
   * Get a nasihat by id
   */
  getUserById (id) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then((db) => {
          db.collection(collectionName)
            .find({id: id})
            .limit(1)
            .toArray(function (err, user) {
              if (err) reject(err)

              resolve(user[0])
              db.close()
            })
        })
        .catch(err => console.log(err))
    })
  }

  /**
   * Update nasihat by id
   */

  /**
   * Create a new nasihat
   * TODO sanitize insertData @important
   * TODO automatic add increment id field to insertData @important @urgent
   */

  /**
   * Delete a nasihat
   * @params id if not Number use mongodb _id: ObjectId
   */

}

function connectToDB (url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) reject(err)

      resolve(db)
    })
  })
}
