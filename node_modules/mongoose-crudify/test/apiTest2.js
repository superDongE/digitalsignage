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
  endResponseInAction: false,
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
    },
    {
      middlewares: [echoReqObj]
    }
  ]
}))

app.listen(3001, function () {
  console.log('Example app listening on port ' + 3001)
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
function echoReqObj (req, res) {
  res.json(req.crudify)
}

describe('options', function () {
  before(function (done) {
    Article.remove({}, (err) => {
      if (err) throw err
      done()
    })
    Article.create({title: 'article1'})
  })
  after(function (done) {
    mongoose.disconnect(() => {
      done()
    })
  })
  describe('when endResponseInAction is false', function () {
    it('should let afterActions handel response', function (done) {
      chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body.result).to.be.an('array')
        expect(res.body.result).to.have.lengthOf(1)
        done()
      })
    })
  })
})
