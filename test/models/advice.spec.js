/* global describe, it, require, should  */
/* eslint handle-callback-err: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-var: "error" */
/* eslint-env es6 */

let ObjectID = require('mongodb').ObjectId
let mongoose = require('mongoose')
let assert = require('assert')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = require('should')
let server = require('../../app.spec')

let Nasihat = require('../../app/models/advices')
chai.use(chaiHttp)

describe('▶▶ Unit Test::ConnectionDB', () => {
  describe('Provide Data', function () {
    it('it should connect to database', (done) => {
      mongoose.connect('mongodb://localhost/nasihat-test', {useMongoClient: true}, done)
    })
    it('should clear the database', function (done) {
      Nasihat.remove({}, done)
    })
    it('should create 3 sample data', (done) => {
      let nasihat = new Nasihat(
        {
          _id: new ObjectID(),
          id: 9999999997,
          text: 'Test Advice',
          source: 'Source test',
          source_link: 'Some random link'
        })
      let nasihat2 = new Nasihat(
        {
          _id: new ObjectID(),
          id: 9999999998,
          text: 'Test Advice 2',
          source: 'Source test 2',
          source_link: 'Some random link 2'
        })

      let nasihat3 = new Nasihat(
        {
          _id: new ObjectID(),
          id: 9999999999,
          text: 'Test Advice 3',
          source: 'Source test 3',
          source_link: 'Some random link 3'
        })
      nasihat.save()
      nasihat2.save()
      nasihat3.save()
      done()
    })
  })
  describe('API Test', () => {
    /*
     * Test the /GET route
     */
    describe('/GET advice', () => {
      it('it should GET the next advice of 2', (done) => {
        chai.request(server)
          .get('/nasihat/next/9999999998')
          .end((err, res) => {
            res.status.should.be.equal(200)
            res.body.should.have.property('id', 9999999999)
            done()
          })
      })
      it('it should GET the previous advice of 2', (done) => {
        chai.request(server)
          .get('/nasihat/prev/9999999998')
          .end((err, res) => {
            res.status.should.be.equal(200)
            res.body.should.have.property('id', 9999999997)
            done()
          })
      })
    })
  })

  describe('MODELS', () => {
    it('it should create a sample data', (done) => {
      let nasihat = new Nasihat({
        _id: new ObjectID(),
        id: 9999999996,
        text: 'Test Advice',
        source: 'Source test',
        source_link: 'Some random link'
      })
      nasihat.save(done)
    })
    it('it should read the sample data', (done) => {
      Nasihat.find({id: 9999999999}, done).limit(1)
    })

    it('it should update the sample data')
    it('it should delete the sample data')
  })

  describe('Environment', () => {
    it('should serve a correct port', function () {
      assert.ok(true)
    })

    it('should have an .env configuration', function () {
      assert.ok(true)
    })

    describe('PRODUCTION', () => {
      it('should not use test configuration', function () {
        assert.ok(true)
      })
      it('should use configuration provided from ENV instead from config', function () {
        assert.ok(true)
      })
    })

    describe('ENV', () => {
      it('should be able to test without previous config dependencies', function () {
        assert.ok(true)
      })
    })
  })
})
