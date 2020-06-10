const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/User')

router.get('/admin', function(req, res) {
  User.register(new User({ username: 'admin' }), 'admin', function() {
    res.redirect('/login')
  })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({ success: true })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
