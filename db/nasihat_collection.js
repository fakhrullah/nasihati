var MongoClient = require('mongodb').MongoClient
// var ObjectId = require('mongodb').ObjectId
const config = require('../config')

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true })

// Connection URL
var url = config.db_url()
var collectionName = 'nasihats'

// Read data
module.exports = {

  /**
   * Get a nasihat by id
   */
  getNasihatById (id, {db}) {
    return new Promise((resolve, reject) => {
      db
        .collection(collectionName)
        .find({id: id})
        .limit(1)
        .toArray(function (err, quote) {
          if (err) reject(err)

          resolve(quote[0])
          // db.close()
        })
        // .catch(err => console.log(err))
    })
  },

  /**
   * Update nasihat by id
   */
  updateNasihatById (id, updateData) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then(db => {
          db.collection(collectionName)
            .updateOne({id: id},
              updateData,
              (err, result) => {
                // TODO pass a full result not result.result
                if (err) reject(err)

                resolve(result)
                db.close()
              })
        })
        .catch(err => console.log(err))
    })
  },

  /**
   * Create a new nasihat
   * TODO sanitize insertData @important
   * TODO automatic add increment id field to insertData @important @urgent
   */
  createNasihat (insertData) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then(db => {
          db.collection(collectionName)
            .insert(insertData,
              (err, result) => {
                if (err) reject(err)

                resolve(result)
              })
        })
        .catch(err => console.log(err))
    })
  },

  /**
   * Delete a nasihat
   * @params id if not Number use mongodb _id: ObjectId
   */
  deleteNasihat (id, callback) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then(db => {
          db.collection(collectionName)
            .remove({id: id}, (err, result) => {
              if (err) reject(err)

              resolve(result)
              db.close()
            })
        })
    })
  },

  /**
   * get next nasihat for given id
   */
  getNextNasihatForId (id, {db}) {
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .find({id: {$gt: id}})
        .limit(1)
        .toArray((err, result) => {
          if (err) reject(err)

          resolve(result[0])
        })
    })
  },

  /**
   * get previous nasihat for given id
   */
  getPrevNasihatForId (id, {db}) {
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .find({id: {$lt: id}})
        .sort({id: -1})
        .limit(1)
        .toArray((err, result) => {
          if (err) reject(err)
          resolve(result[0])
        })
    })
  }
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
