const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

// process.env now has the keys and values you defined in your .env file.
require('dotenv').config()

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./config')(app)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

module.exports = app
