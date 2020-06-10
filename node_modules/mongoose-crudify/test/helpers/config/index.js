module.exports = function (app) {
  let mongoose = require('./mongoose')
  // let routes = require('./routes')(app)

  return {
    mongoose
    // routes
  }
}
