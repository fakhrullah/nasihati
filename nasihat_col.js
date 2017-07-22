var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

// Connection URL
var url = 'mongodb://localhost:27017/nasihat'

let Log = require('../utils/logger')

// Read data
module.exports = {

  /**
   * Update nasihat by id
   */
  updateNasihatById: function (id, updateData, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) callback(err)

      var col = db.collection('nasihats')

      col.updateOne(
        {id: id},
        { $set: updateData },
        function (err, result) {
          // TODO pass a full result not result.result
          callback(err, result.result)

          db.close()
        }
      )
    })
  },

  /**
   * Create a new nasihat
   * TODO sanitize insertData @important
   * TODO automatic add increment id field to insertData @important @urgent
   */
  createNasihat: function (insertData, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) return callback(err)

      var col = db.collection('nasihats')

      col.insert(insertData, function (err, result) {
        callback(err, result)
        db.close()
      })
    })
  },

  /**
   * Delete a nasihat
   * @params id if not Number use mongodb _id: ObjectId
   */
  deleteNasihat: function (id, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) return callback(err)

      var col = db.collection('nasihats')

      // Determined type of id in used. Mongo default _id or increment id
      var lookingId
      if (!ObjectId.isValid(id)) {
        // Log.d('~~~~~~~~~~~~~~ use id : the increment on');
        lookingId = {id: parseInt(id)}
      } else {
        // Log.d('~~~~~~~~~~~~~~ use ObjectId')
        lookingId = {_id: ObjectId(id)}
      }

      col.remove(lookingId, function (err, result) {
        callback(err, result)
        db.close()
      })
    })
  },

  /**
   * get next nasihat for given id
   */
  getNextNasihatForId: function (id, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        Log.e('ERROR: ' + err.message)
        return callback(err)
      }

      var col = db.collection('nasihats')

      Log.d('find nasihat next to ' + id)

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
        Log.e('ERROR: ' + err.message)
        return callback(err)
      }

      var col = db.collection('nasihats')

      Log.d('find nasihat next to ' + id)

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
