const express = require('express')
const router = express.Router()
const session = require('express-session')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const models = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(expressValidator())
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

let sess =

router.get('/', function (req, res) {
  sess = req.session
  if (sess.username) {
    models.Gab.findAll({order: [['createdAt', 'DESC']]}).then(function (gabbles) {
      res.render('index', {username: sess.username, gabbles: gabbles})
    })
  } else {
    res.redirect('/login')
  }
})

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.get('/create', function (req, res) {
  sess = req.session
  if (sess.username) {
    return res.render('create', {username: sess.username})
  } else {
    return res.redirect('/login')
  }
})

router.post('/login', function (req, res) {
  let sess = req.session
  const username = req.body.username
  const password = req.body.password
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function (user) {
    if (user.password === password) {
      sess.username = user.username
      sess.password = user.password
      return res.redirect('/')
    }
  }).catch(function (error) {
    let errorMessage = 'Your username or password is incorrect'
    res.render('login', {errorMessage: errorMessage,
      errors: error.errors})
  })
})

router.post('/signup', function (req, res) {
  const user = models.User.build({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  user.save()
    .then(function () {
      res.redirect('/')
    }).catch(function (error) {
      res.render('signup',
        { errors: error.errors
        })
    })
})

router.post('/create', function (req, res) {
  console.log(req.body)
  const gab = models.Gab.build({
    username: sess.username,
    message: req.body.message
  })
  gab.save()
  .then(function () {
    res.redirect('/')
  }).catch(function (error) {
    res.render('signup',
      { errors: error.errors
      })
  })
})

router.post('/logout', function (req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''
  res.redirect('/login')
})

module.exports = router
