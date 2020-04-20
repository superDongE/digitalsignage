# mongoose-crudify

Generates crud routes for mongoose model

## Install
```bash
$ npm i -S mongoose-crudify
```

## Example
```js
var mongooseCrudify = require('mongoose-crudify')
var Article = require('../app/models/article')

/**
 * By default, following routes are generated
 *  list    - GET /articles/
 *  create  - POST /articles/
 *  read    - GET /articles/{id}/
 *  update  - PUT /articles/{id}/
 *  delete  - DELETE /articles/{id}/
 */
app.use('/articles', mongooseCrudify({
  Model: Article,
  beforeActions: [
    {
      middlewares: [ensureLogin],
      except: ['list', 'read']
    }
  ],
}))
```

## Available options
```js
var mongooseCrudify = require('mongoose-crudify')
var Article = require('../app/models/article')

app.use('/articles', mongooseCrudify({
  Model: Article, // mongoose model, required
  identifyingKey: '_id', // route param name, defaults to '_id'
  selectFields: 'pub1 pub2 -secret', // http://mongoosejs.com/docs/api.html#query_Query-select

  // reuse your existing express.Router() object
  router: existingRouter

  // load model on update and read actions, defaults to true
  // store the found model instance in req, eg: req.crudify.article
  // if changed to false, you must override the update and read middlewares
  loadModel: true,
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
  ],

  // change to false so that you can modify and end response in after actions
  endResponseInAction: true,
  actions: {
    // default actions: list, create, read, update, delete
    // any non-overridden action will be in functional
    // store query result or err in req.crudify
    // auto calling next() if after actions defined for this action

    // override read
    read: ({crudify}, res) => {
      res.json(crudify.article)
    }
  },
  afterActions: [
    {
      middlewares: [updateViewCount, modifyQueryResult],
      only: ['read']
    },
    {
      middlewares: [generalResponder],
      except: ['read']
    }
  ],
  options: {
    // https://expressjs.com/en/api.html#express.router
    // if no existing router passed in, new one will be created with these options
    // all default to false
    caseSensitive: false,
    mergeParams: false,
    strict: false
  }
}))
function ensureLogin (req, res, next) {
  if (req.get('X-USERNAME') !== 'ryo') {
    return res.sendStatus(401)
  }
  next()
}
function updateViewCount (req, res) {
  let article = req.crudify.article // or req.crudify.result
  article.likes++
  article.save()
}
function modifyQueryResult (req, res) {
  let article = req.crudify.result
  article.title = 'new title'
  res.json(article)
}
function generalResponder(req, res){
  res.json(req.crudify.err || req.crudify.result)
}
```
