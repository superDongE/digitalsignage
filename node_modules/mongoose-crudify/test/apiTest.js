/* global describe, it, before, after */
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const crudify = require('../')
const app = require('./helpers/app')
const mongoose = require('mongoose')
const Article = require('./helpers/models/article')

chai.use(chaiHttp)

app.use('/articles', crudify({
  Model: Article,
  identifyingKey: 'oldId',
  beforeActions: [
    {
      middlewares: [ensureLogin],
      except: ['list', 'read']
    }
  ],
  afterActions: [
    {
      middlewares: [updateViewCount],
      only: ['read']
    }
  ]
}))
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT)
})
function ensureLogin (req, res, next) {
  if (req.get('X-USERNAME') !== 'ryo') {
    return res.sendStatus(401)
  }
  next()
}
function updateViewCount (req, res) {
  let article = req.crudify.article
  article.likes++
  article.save()
}

describe('generated api', function () {
  let id = {
    identifyingKey: crudify.exposure.params.identifyingKey
  }
  before(function (done) {
    Article.remove({}, (err) => {
      if (err) throw err
      done()
    })
  })
  after(function (done) {
    mongoose.disconnect(() => {
      done()
    })
  })
  it('should not get article', function (done) {
    chai.request(app)
      .get('/article')
      .end(function (err, res) {
        expect(err).to.exist
        expect(res).to.have.status(404)
        done()
      })
  })
  it('should get articles array of length 0', function (done) {
    chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(0)
        done()
      })
  })
  it('should call beforeActions', function (done) {
    chai.request(app)
      .post('/articles')
      .send({ oldId: 1, title: 'title1' })
      .end(function (err, res) {
        expect(err).to.exist
        expect(res).to.have.status(401)
        done()
      })
  })
  it('should create 1 article and return the doc', function (done) {
    chai.request(app)
      .post('/articles')
      .set('X-USERNAME', 'ryo')
      .send({ oldId: 1, title: 'title1' })
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body._id).to.exist
        id.value = res.body[id.identifyingKey]
        done()
      })
  })
  it('should get article with that id', function (done) {
    chai.request(app)
      .get('/articles/' + id.value)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body.likes).to.equal(0)
        done()
      })
  })
  it('should call afterActions', function (done) {
    chai.request(app)
      .get('/articles/' + id.value)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body.likes).to.equal(1)
        done()
      })
  })
  it('should get articles array of length 1', function (done) {
    chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(1)
        done()
      })
  })
  it('should update article', function (done) {
    Article.findOne({}, (err, doc) => {
      if (err) throw err
      chai.request(app)
        .put('/articles/' + doc[id.identifyingKey])
        .set('X-USERNAME', 'ryo')
        .send({ title: 'changed' })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body.title).to.equal('changed')
          done()
        })
    })
  })
  it('should delete article', function (done) {
    Article.findOne({}, (err, doc) => {
      if (err) throw err
      chai.request(app)
        .delete('/articles/' + doc[id.identifyingKey])
        .set('X-USERNAME', 'ryo')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(204)
          done()
        })
    })
  })
  it('should get articles array of length 0', function (done) {
    chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(0)
        done()
      })
  })
})
