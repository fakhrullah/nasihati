var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

// Connection URL
var url = 'mongodb://localhost:27017/nasihat'
var collectionName = 'nasihats'

// Read data
module.exports = {

  /**
   * Get a nasihat by id
   */
  getNasihatById (id) {
    return new Promise((resolve, reject) => {
      connectToDB(url)
        .then((db) => {
          db.collection(collectionName)
            .find({id: id})
            .limit(1)
            .toArray(function (err, quote) {
              if (err) reject(err)

              resolve(quote[0])
              db.close()
            })
        })
        .catch(err => console.log(err))
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
              { $set: updateData },
              (err, result) => {
                // TODO pass a full result not result.result
                if (err) reject(err)

                resolve(result.result)
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
            .remove({id: id},
              (err, result) => {
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
  getNextNasihatForId: function (id, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('ERROR: ' + err.message)
        return callback(err)
      }

      var col = db.collection('nasihats')

      console.log('find nasihat next to ' + id)

      col.find({ id: {$gt: id} }).limit(1).toArray(function (err, data) {
        if (err) {
          db.close()
          return callback(err)
        }

        callback(null, data[0])
        db.close()
      })
    })
  },

  /**
   * get previous nasihat for given id
   */
  getPrevNasihatForId: function (id, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('ERROR: ' + err.message)
        return callback(err)
      }

      var col = db.collection('nasihats')

      console.log('find nasihat next to ' + id)

      col.find({ id: {$lt: id} }).sort({id: -1}).limit(1).toArray(function (err, data) {
        if (err) {
          db.close()
          return callback(err)
        }

        callback(null, data[0])
        db.close()
      })
    })
  }
}

function connectToDB (url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) reject(err)

      resolve(db)
    })
  })
}
