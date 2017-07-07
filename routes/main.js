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
    models.Gab.findAll({order: [['createdAt', 'DESC']],
      include: [{
        model: models.Like,
        as: 'like'
      }]
    })
    .then(function (gabbles) {
      for (var i = 0; i < gabbles.length; i++) {
        if (gabbles[i].username === sess.username) {
          gabbles[i].showDelete = true
        }
      }
      res.render('index', {
        username: sess.username,
        gabbles: gabbles
      })
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
    return res.render('create', {
      username: sess.username
    })
  } else {
    return res.redirect('/login')
  }
})

router.get('/messages/:id', function (req, res) {
  sess = req.session
  models.Gab.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: models.Like,
      as: 'like'
    }]
  }).then(function (gabbles) {
    res.render('messages', {
      username: sess.username,
      gabbles: gabbles
    })
  })
})

router.get('/profile/:username', function (req, res) {
  sess = req.session
  models.Gab.findAll({
    where: {
      username: req.params.username
    },
    order: [['createdAt', 'DESC']],
    include: [{
      model: models.Like,
      as: 'like'
    }]
  }).then(function (gabbles) {
    res.render('profiles', {
      username: sess.username,
      gabbles: gabbles
    })
  })
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
    res.render('login', {
      errorMessage: errorMessage,
      errors: error.errors
    })
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
      res.render('signup', {
        errors: error.errors
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
    res.render('signup', {
      errors: error.errors
    })
  })
})
router.post('/like', function (req, res) {
  sess = req.session
  const like = models.Like.build({
    username: sess.username,
    gabId: req.body.like
  })
  like.save()
  .then(function () {
    res.redirect('/')
  })
})
router.post('/delete/:id', function (req, res) {
  sess = req.session
  models.Gab.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (gab) {
    models.Gab.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/')
  })
})

router.post('/logout', function (req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''
  res.redirect('/login')
})

module.exports = router
