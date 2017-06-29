const express = require('express')
const router = express.Router()
const session = require('express-session')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
// const models = require('./models')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(expressValidator())
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

router.get('/', function (req, res) {
  res.render('index')
})
router.get('/login', function (req, res) {
  res.render('login')
})
router.get('/signup', function (req, res) {
  res.render('signup')
})
router.get('/create', function (req, res) {
  res.render('create')
})

module.exports = router
