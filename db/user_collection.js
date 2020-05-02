var MongoClient = require('mongodb').MongoClient
// var ObjectId = require('mongodb').ObjectId
const config = require('../config')

// Connection URL
var url = config.db_url()
var collectionName = 'user'
console.log(url)

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true })

// Read data
module.exports = {

  /**
   * Get a user by id
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
  },

  getUserByApiKey (apikey) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then(db => {
          db.collection(collectionName)
            .find({apikey: apikey})
            .toArray((err, users) => {
              if (err) reject(err)
              if (!users.length) reject(new Error('No user with apikey'))
              if (users.length > 1) reject(new Error('Same user should not has same key. This is error in software or database, contact site owner.'))

              resolve(users[0])
              db.close()
            })
        })
    })
  },

  getUserByUsername (username) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then(db => {
          db.collection(collectionName)
            .find({username: username})
            .toArray((err, users) => {
              if (err) {
                reject(err)
                db.close()
                return
              }

              if (!users.length) {
                reject(new Error('User not found.'))
                db.close()
                return
              }

              resolve(users[0])
              db.close()
            })
        })
    })
  }

  /**
   * Update user by id
   */

  /**
   * Create a new user
   * TODO sanitize insertData @important
   * TODO automatic add increment id field to insertData @important @urgent
   */

  /**
   * Delete a user
   * @params id if not Number use mongodb _id: ObjectId
   */

}

function connectToDB (url) {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err)

      resolve(client.db("test"))
    })
    .catch(console.log)
  })
}
