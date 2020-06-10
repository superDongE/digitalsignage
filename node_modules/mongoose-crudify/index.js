const express = require('express')
const _ = require('lodash')
const errors = require('./lib/errors')
const helpers = require('./lib/helpers')

function crudify (params) {
  if (!params || params.constructor !== Object) {
    throw new Error(errors.argumentTypeError)
  }
  if (!params.Model) {
    throw new Error(errors.missingModelError)
  }

  params.identifyingKey = params.identifyingKey || '_id'
  if (params.loadModel === undefined) {
    params.loadModel = true
  }
  if (params.storeResultInReq === undefined) {
    params.storeResultInReq = true
  }
  if (params.endResponseInAction === undefined) {
    params.endResponseInAction = true
  }
  params.beforeActions = params.beforeActions || []
  params.afterActions = params.afterActions || []

  params.actions = params.actions || {}
  params.actions =
    _.defaults(params.actions,
               crudify.getDefaultActions(params.Model,
                                         params.identifyingKey,
                                         params.selectFields,
                                         params.storeResultInReq,
                                         params.endResponseInAction))

  params.options = params.options || {}
  params.options = _.defaults(params.options, {
    caseSensitive: false,
    mergeParams: false,
    strict: false
  })

  /**
   * add before and after hooks
   */
  const actionNames = Object.keys(params.actions)
  const hooks = {}
  // load model on update and read actions
  if (params.loadModel) {
    params.beforeActions.unshift({
      middlewares: [
        crudify.getLoadModel(params.Model,
                             params.identifyingKey,
                             params.selectFields)
      ],
      only: ['read', 'update']
    })
  }
  helpers.addHooks(hooks, 'before', params.beforeActions, actionNames)
  helpers.addHooks(hooks, 'after', params.afterActions, actionNames)

  const router = params.router || express.Router(params.options)

  for (let action in params.actions) {
    let httpMethod = crudify.actionsMapping[action] || action

    if (typeof router[httpMethod] === 'function') {
      let url = crudify.actionsNeedParam.includes(action)
        ? ('/:' + params.identifyingKey)
        : '/'
      router[httpMethod](url,
                         hooks['before'][action],
                         params.actions[action],
                         hooks['after'][action])
    }
  }

  crudify.exposure = {
    params,
    hooks,
    actionNames
  }

  return router
}

crudify.actionsMapping = {
  list: 'get',
  create: 'post',
  read: 'get',
  update: 'put',
  delete: 'delete'
}

crudify.actionsNeedParam = ['read', 'update', 'delete']

crudify.getLoadModel = function (Model, identifyingKey, selectFields) {
  return function _loadModel (req, res, next) {
    let condition = {}
    condition[identifyingKey] = req.params[identifyingKey]

    let query = Model.findOne(condition)
    if (selectFields) {
      query.select(selectFields)
    }

    query.exec((err, doc) => {
      if (err) return res.status(500).json(err)
      if (doc) {
        req.crudify = {
          [Model.modelName.toLowerCase()]: doc
        }
        next()
      } else {
        return res.sendStatus(404)
      }
    })
  }
}

crudify.getDefaultActions = (Model, identifyingKey, selectFields,
                             storeResultInReq, endResponseInAction) => {
  let modelName = Model.modelName.toLowerCase()
  return {
    /** GET / - List all entities */
    list: (req, res, next) => {
      let query = Model.find(req.params)
      if (selectFields) {
        query.select(selectFields)
      }

      query.exec((err, docs) => {
        if (endResponseInAction) {
          if (err) {
            return res.json(err)
          }
          res.json(docs)
        }
        if (storeResultInReq) {
          helpers.addObjectToReq(req, {
            err: err,
            result: docs
          })
        }
        if (crudify.exposure.hooks['after']['list'].length > 0) {
          next()
        }
      })
    },

    /** POST / - Create a new entity */
    create: (req, res, next) => {
      let newDoc = new Model()
      Object.assign(newDoc, req.body)
      newDoc.save(function (err) {
        if (endResponseInAction) {
          if (err) {
            return res.json(err)
          }
          res.json(newDoc)
        }
        if (storeResultInReq) {
          helpers.addObjectToReq(req, {
            err: err,
            result: newDoc
          })
        }
        if (crudify.exposure.hooks['after']['create'].length > 0) {
          next()
        }
      })
    },

    /** GET /:id - Return a given entity */
    read: (req, res, next) => {
      if (endResponseInAction) {
        res.json(req.crudify[modelName])
      }
      if (storeResultInReq) {
        helpers.addObjectToReq(req, {
          result: req.crudify[modelName]
        })
      }

      if (crudify.exposure.hooks['after']['read'].length > 0) {
        next()
      }
    },

    /** PUT /:id - Update a given entity */
    update: (req, res, next) => {
      const oldDoc = req.crudify[modelName]
      for (let key in req.body) {
        if (key !== '_id') {
          oldDoc[key] = req.body[key]
        }
      }

      oldDoc.save(function (err, newDoc) {
        if (endResponseInAction) {
          if (err) {
            return res.json(err)
          }

          res.json(newDoc)
        }
        if (storeResultInReq) {
          helpers.addObjectToReq(req, {
            err: err,
            result: newDoc
          })
        }
        if (crudify.exposure.hooks['after']['update'].length > 0) {
          next()
        }
      })
    },

    /** DELETE /:id - Delete a given entity */
    delete: (req, res, next) => {
      let condition = {}
      condition[identifyingKey] = req.params[identifyingKey]

      Model.remove(condition, function (err) {
        if (endResponseInAction) {
          if (err) {
            return res.json(err)
          }
          res.sendStatus(204)
        }
        if (storeResultInReq) {
          helpers.addObjectToReq(req, {
            err: err
          })
        }
        if (crudify.exposure.hooks['after']['delete'].length > 0) {
          next()
        }
      })
    }
  }
}

module.exports = crudify
